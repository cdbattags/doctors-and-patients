/**
 * @fileoverview This is not a model, but rather a special entity that "registers" all the Sequelize models in this
 *               directory ignoring certain blacklisted files, including the README.md and this file itself. The
 *               registration process only happens once, and is bound to the current Sequelize instance, which is also
 *               only created once and done within this file.
 */

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const confLoader = require('./common/conf-loader')
const config = confLoader.getByName('database')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

const registry = {}

// What this does is look in the current directory for all files, ignoring dot-files, this file itself, and README.md,
// and imports the models into the current sequelize instance.
fs.readdirSync(path.join(__dirname, '../models'))
    .filter((filename) => {
        return filename.match(/.+\-model\.js/)
    })
    .forEach((filename) => {
        const model = sequelize.import(path.join(__dirname, `../models/${filename}`))
        registry[model.name] = model
    })

Object.keys(registry).forEach((modelName) => {
    if ('associate' in registry[modelName]) {
        registry[modelName].associate(registry)
    }
})

registry.sequelize = sequelize
registry.Sequelize = Sequelize

module.exports = registry
