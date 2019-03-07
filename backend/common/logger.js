/**
 * Log levels: error: 0, warn: 1, info: 2, debug: 3
 *
 * Environment specific configuration:
 *   console
 *      development -   log debug or higher level to console
 *      else -          log info or higher level to console
 *   log-info-[date].log
 *      development -   log debug or higher level to console
 *      else -          log info or higher level to console
 *
 * Sample:
 *  // Declaration:
 *      var logger = require('/src/common/logger.js')(module.filename)
 *
 *  // Usage:
 *      logger.debug('debug level log')
 *      logger.info('info level log')
 *      logger.warn('warn level log')
 *      logger.error('error level log')
 */

const fs = require('fs')
const moment = require('moment')
const winston = require('winston')

const loggerConf = require('../../config/logger.json')
const confLoader = require('./conf-loader')

const logDir = 'log'
const env = confLoader.getEnvironment()

const logTimeFormat = 'MM-DD-YYYY HH:mm:ss.SSS'
const dateToday = moment().format('MM-DD-YYYY')
const maxFileSize = 1024 * 1024 * 100 // 100MB
const maxFiles = 20

winston.addColors(loggerConf.colors)

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const logger = (filename) => {
    
    const getLabel = () => {
        const parts = filename.split('doctors-and-patients/')
        return (parts && parts.length > 1) ? parts[1] : ''
    }

    return new winston.createLogger({
        levels: loggerConf.levels,
        transports: [
            new winston.transports.Console({
                level: env === 'development' ? 'debug' : 'info',
                colorize: true,
                json: false,
                prettyPrint: true,
                timestamp: () => moment().format(logTimeFormat),
                showLevel: true,
                label: getLabel()
            }),
            new winston.transports.File({
                name: 'base',
                level: env === 'development' ? 'debug' : 'info',
                filename: `${logDir}/log-info-${dateToday}.log`,
                maxsize: maxFileSize,
                maxFiles: maxFiles,
                json: false,
                prettyPrint: true,
                tailable: true,
                timestamp: () => moment().format(logTimeFormat),
                label: getLabel()
            }),
            new winston.transports.File({
                name: 'error',
                level: 'error',
                filename: `${logDir}/log-error-${dateToday}.log`,
                maxsize: maxFileSize,
                maxFiles: maxFiles,
                json: false,
                prettyPrint: true,
                tailable: true,
                timestamp: () => moment().format(logTimeFormat),
                label: getLabel()
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                name: 'exception',
                filename: `${logDir}/log-exception-${dateToday}.log`,
                maxsize: maxFileSize,
                json: false,
                showLevel: true,
                prettyPrint: true,
                tailable: true,
                timestamp: () => moment().format(logTimeFormat),
                label: getLabel()
            })
        ],
        exitOnError: false
    })
}

module.exports = logger
