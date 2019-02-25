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
        
        logger.info(params)

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
    }
}

module.exports = UserController