const logger = require('../common/logger')(module.filename)
const models = require('../sequelize-registry')
const _ = require('lodash')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = models.sequelize.Op
const fs = require('fs')
const path = require('path')
const jwtDecode = require('jwt-decode')

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

        const email = _.get(params, 'loginData.value.email', null)
        const password = _.get(params, 'loginData.value.password', null)

        const where = {
            email: {
                [Op.eq]: email
            }
        }
        
        return models.User
            .findOne({
                attributes: {
                    where: where
                }
            })
            .then((result) => {

                const user = result.dataValues

                if (user) {

                    const match = bcrypt.compareSync(
                        password,
                        user.passwordHash
                    )

                    if (match) {

                        const payload = _.omit(
                            user,
                            ['passwordHash']
                        )

                        const token = jwt.sign(
                            payload,
                            fs.readFileSync(path.join(__dirname, '../../config/jwtRS256.key')),
                            {
                                algorithm: 'RS256',
                                expiresIn: '1h'
                            }
                        )


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

    },

    /**
     * POST /login
     */
    me: (request, response, next) => {

        const token = request.headers.authorization

        if (
            !jwt.verify(
                token,
                fs.readFileSync(path.join(__dirname, '../../config/jwtRS256.key.pub')),
                {
                    algorithms: ['RS256']
                }
            )
        ) {
            response
                .status(401)
                .json({
                    message: "token not verified"
                })
        }

        const decodedToken = jwtDecode(token)

        console.log(decodedToken)

        const queries = []

        queries.push(
            models.User
            .findOne({
                attributes: {
                    where: {
                        email: {
                            [Op.eq]: decodedToken.email
                        }
                    }
                }
            })
        )

        queries.push(
            models
                .sequelize
                .query(`SELECT * FROM doctor_patients as dp JOIN users as u ON dp.patient = u.id WHERE doctor = '${decodedToken.id}'`)
        )

        Promise.all(queries)
            .then((results) => {

                const user = results[0].dataValues
                const patients = results[1][0]

                if (user && patients) {

                    response
                        .status(200)
                        .json({
                            ...user,
                            patients: patients
                        })

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