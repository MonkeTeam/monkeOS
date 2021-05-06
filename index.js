const CLI = require('./src/cli.js')
const Config = require('./src/config.js')
const chalk = require('chalk');
const figlet = require('figlet');

console.log(
  chalk.green(
    figlet.textSync('MonkeOS', { horizontalLayout: 'full' })
  )
);


const config = new Config()

const cli = new CLI()
cli.init()
