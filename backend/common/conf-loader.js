const deref = require('json-schema-deref-sync')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const DEFAULT_DEPLOY_ENV = 'deploy-env'

const confLoader = {
    /**
     * Retrieves the specified configuration file from the `config` folder. Note that this will fail and throw an
     * exception (from `require()``) if the file doesn't exist.
     *
     * @param {string} name The name of the configuration you want to load, excluding the .json extension.
     * @return {Object}
     */
    getByName: (name) => {
        const environment = confLoader.getEnvironment()
        const schema = deref(require(`../../config/${name}.json`))

        // To minimize cookbook complexity, return configs for the default "deploy-env"
        // when configs don't exist for the specific deploy env
        if (
            environment === DEFAULT_DEPLOY_ENV &&
            !schema.hasOwnProperty(environment)
        ) {
            return schema[DEFAULT_DEPLOY_ENV]
        }

        return schema[environment]
    },

    /**
     * Returns the environment string. Defaults to 'development' if no environment variables or command-line options
     * were specified. The reason this is placed here instead of as a global is that we don't want to rely on
     * `require()`'s ordering to resolve environment properly. At runtime, this will be correct there's no guarantees
     * that this is the case at `require()` time.
     *
     * @return {string}
     */
    getEnvironment: () => argv.environment || process.env.NODE_ENV || 'development'
}

module.exports = confLoader
