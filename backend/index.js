
const _ = require('lodash')
const minimist = require('minimist')

const app = require('./app')
const logger = require('./common/logger')(module.filename)
const models = require('./sequelize-registry')

/**
 * Get port from command-line and store in Express.
 */
const argv = minimist(process.argv.slice(2))
app.set('port', argv.port || 9300)

let server

module.exports = {
    
    /**
     * Returns the current server instance, if any.
     * @return {Object} server instance
     */
    getServer: () => server,

    /**
     * Start the server. Returns a promise that resolves to either null if no fixture data was specified or the array
     * of basic fixture data objects that were added.
     *
     * @param {?Object=} options Options for initializing the service.
     * @param {?boolean=} options.clear If set to true, it will clear the database.
     * @param {?boolean|Array.<Object>} options.fixtures If set to true, will bootstrap using the default data set, and
     *                                                   if set to an array of Objects, will bootstrap using that data.
     * @return {}
     */
    start: (options = {}) => {
        
        let fixtures = null // we can use this instead of a "seed system"

        const sequelizeOptions = 
            (options.clear || options.fixtures) ? { force: true } : null

        return models
            .sequelize
            .sync(sequelizeOptions)
            .then(() => {
                return app.swaggerize()
            })
            .then((app) => {
                return new Promise((resolve, reject) => {
                        server = app.listen(app.get('port'), () => {
                            logger.info(`"doctors-and-patients" is listening on port ${server.address().port}`)
                            resolve(server)
                        })
                    }
                )
            })
            .catch((error) => {
                logger.error(error)
                return Promise.reject(error)
            })

    },

    /**
     * Stop the server.
     * @return {}
     */
    stop: () => {
        return new Promise((resolve, reject) => {
                if (server) {
                    server.close(resolve)
                    server = undefined
                } else {
                    logger.error('Server is not running, cannot stop.')
                    reject()
                }
            }
        )
    }
    
}
