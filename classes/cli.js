const readline = require('readline')
const fs = require('fs')

class CLI
{
	constructor()
	{
		this.rl;
		this.commands;
	}

	init()
	{
		this.rl = readline.createInterface({
			input: process.stdin
		})

		this.showWelcomeMessage()
		this.run()
		this.loadCommands()

		this.rl.on('close', () => {
			console.log("\nExiting...")
		})
	}

	run()
	{
		let _this = this
		process.stdout.write(">_ ")

		this.rl.question('', command => {
			const exists = _this.commands.indexOf(command)

			if(exists > -1)
			{
				let cmd = require('./commands/' + command + '.js')
				cmd = new cmd()
				cmd.run()
			}
			else
			{
				_this.showNotFoundError(command)
			}
			_this.run()
		})
	}

	showWelcomeMessage()
	{
		console.log(`js-OS v0.0.1`)
	}

	loadCommands()
	{
		const rawdata = fs.readFileSync('./classes/commands.json')
		this.commands = JSON.parse(rawdata)
	}

	showNotFoundError(command)
	{
		console.log(`error: command "${command}" is invalid`)
	}
}

module.exports = CLI