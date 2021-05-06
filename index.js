const CLI = require('./src/cli.js')
const Config = require('./src/config.js')

const config = new Config()

const cli = new CLI()
cli.init()
