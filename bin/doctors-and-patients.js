#!/usr/bin/env node

/**
 * @fileoverview Executable for running the Curriculum Insights service layer.
 */

const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const main = require('../backend/index')

const serverOpts = {}

if (argv.bootstrap) {
    serverOpts.clear = true
    serverOpts.fixtures = true
}

main.start(serverOpts)
