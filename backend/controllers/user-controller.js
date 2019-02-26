const logger = require('../common/logger')(module.filename)
const models = require('../sequelize-registry')
const _ = require('lodash')
const moment = require('moment')
const Op = models.sequelize.Op;

const UserController = {
    /**
     * GET /insights
     */
    getList: (request, response, next) => {
        
        const params = request.swagger.params
        
        // const includeArchived = params.includeArchived.value

        const since = _.get(params, 'since.value', null)

        // const authToken = request.headers.authorization

        const where = {}
        
        if (since) {
            const sinceDate = moment(since).format('YYYY-MM-DD HH:mm:ss');
            where.createdAt = {
                [Op.gt]: sinceDate
            }
        }

        return models.User.findAll({
                attributes: {
                    exclude: ['id']
                },
                where: where,
                order: [
                    ['created_at', 'DESC']
                ]
            })
            .then((users) => {
                response.status(200).send(users)
            })
            .catch((err) => {
                console.log('There was an error querying users', JSON.stringify(err))
                return response.status(500).send(err)
            })
    },

    /**
     * POST /login
     */
    login: (request, response, next) => {

        const params = request.swagger.params

        const email = _.get(params, 'email.value', null)
        const password = _.get(params, 'password.value', null)

        const where = {
            email: {
                [Op.eq]: email
            }
        }
        
        return models.User
            .findOne({
                attributes: {
                    exclude: ['id'],
                    where: where
                }
            })
            .then((user) => {

                if (user) {

                    const match = bcrypt.compareSync(
                        password,
                        user.passwordHash
                    )

                    if (match) {

                        const payload = _.omit(
                            user.serialize(),
                            ['password_hash']
                        )

                        const token = jwt.sign(payload)

                        response.send(token)

                    } else {

                        response
                            .status(401)
                            .json({
                                message: 'invalid password'
                            })

                    }

                } else {

                    response
                        .status(404)
                        .json({
                            message: 'no user by that email found'
                        })

                }

            })
            .catch((error) => {
                logger.error(error)
                response
                    .status(500)
                    .json({
                        message: "an unknown error occurred"
                    })
            })

    }
}

module.exports = UserController