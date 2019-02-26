/**
 * @fileoverview Main application code for "doctors-and-patients".
 * @author christian.d.battaglia@gmail.com
 */

// main 
const bodyParser = require('body-parser')
const compress = require('compression')
const cors = require('cors')
const express = require('express')
const minimist = require('minimist')
const morgan = require('morgan')
const path = require('path')
const swagger = require('swagger-tools')

const confLoader = require('./common/conf-loader')
const logger = require('./common/logger')(module.filename)
const packageSpec = require('../package.json')
const swaggerSpec = require('../config/swagger.json')
const versionSpec = require('../config/version.json')

const argv = minimist(process.argv.slice(2))
const hostname = argv.hostname || ('localhost:' + (argv.port || 9300))

const DEPLOY_ENV = 'deploy-env'
const DEV_ENV = 'development'
const TESTING_ENVS = ['e2e-testing', 'testing']

const app = express()

// Parse all incoming request bodies as JSON if the incoming 'Content-Type' header is set to application/json.
app.use(bodyParser.json())

// Enable compression.
app.use(compress())

// Enable CORS headers for all routes.
app.use(cors())

// Disable off Express advertising in our packet responses for security.
app.disable('x-powered-by')

// Enable 'dev' logging in only development mode, for other modes (including testing mode) use 'common'.
if (
    confLoader.getEnvironment() === DEV_ENV
) {
    
    // This is shorthand for displaying the following attributes:
    //   :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
    app.use(morgan('short'))

} else if (
    !TESTING_ENVS.includes(confLoader.getEnvironment())
) {

    // This is shortand for displaying the following attributes:
    // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
    app.use(morgan('common'))

}

//
// Swagger
//

// Grab the version from npm's package.json and replace the Swagger doc's version so that we only set it in one place.
if (swaggerSpec.info) {
    swaggerSpec.info.version = packageSpec.version
}
swaggerSpec.host = hostname

const swaggerUiOptions = {
    apiDocs: '/api/docs'
}

if (confLoader.getEnvironment() === DEPLOY_ENV) {
    // When deployed using the deploy tool, switch scheme to only use HTTPS.
    swaggerSpec.schemes = ['https']

    // When not doing development support reverse-proxy via api gateway
    swaggerUiOptions.apiDocsPrefix = ''
    swaggerUiOptions.swaggerUiPrefix = ''
}


/**
 * Set up Swagger with this function. The main runner will call this code.
 *
 * @return {Promise.<Object, String>}
 */
app.swaggerize = () => {
    return new Promise((resolve, reject) => {
        swagger.initializeMiddleware(swaggerSpec, (middleware) => {
            try {
                // Interpret Swagger resources and attach metadata to request, must be first.
                app.use(middleware.swaggerMetadata())

                // Route validated requests to appropriate controller.
                app.use(middleware.swaggerRouter({
                    controllers: path.join(__dirname, 'controllers'),
                    useStubs: true
                }))

                // Serve the Swagger documents and Swagger UI
                app.use(middleware.swaggerUi(swaggerUiOptions))

                // Allow the promise to fulfill.
                resolve(app)
            } catch (exception) {
                reject(exception)
            }
        })
    })
}

app.set(
    'view engine',
    'pug'
)

 app.set(
     'views',
     [
         path.join(__dirname, 'views')
     ]
 )

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/assets', express.static(path.join(__dirname, '../frontend/public')))

module.exports = app
