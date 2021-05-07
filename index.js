const CLI = require('./src/cli.js')
const Config = require('./src/config.js')
const chalk = require('chalk');
const figlet = require('figlet');

console.log(
  chalk.green(
    figlet.textSync('MonkeOS', { horizontalLayout: 'full' })
  )
);


// after first, initialize the config class
const config = new Config()

const cli = new CLI()
// initializes cli to use the OS
cli.init()
