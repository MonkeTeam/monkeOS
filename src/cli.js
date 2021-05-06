const readline = require('readline')
const fs = require('fs')
const BinDirSys = require('./filesystem/bin_dir_sys.js')
const MonkeOS = require('./monke-os.js')

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
		this.loadCommands()
		this.run()

		this.rl.on('close', () => {
			console.log("\nExiting...")
		})
	}

	run()
	{
		let _this = this
		process.stdout.write(">_ ")

		this.rl.question('', command => {
			// const exists = _this.commands.indexOf(command)
			if(command in _this.commands)
			{
				if(_this.commands[command] == null)
				{
					let cmd = require('./commands/' + command + '.js')
					cmd = new cmd()
					cmd.run(() => {
						_this.run()
					})
				}
				else
				{
					console.log(_this.commands[command])
					_this.run()
				}
			}
			else
			{
				_this.showNotFoundError(command)
				_this.run()
			}
		})
	}

	showWelcomeMessage()
	{
		console.log(`js-OS v0.0.1`)
	}

	loadCommands()
	{
		const rawdata = fs.readFileSync('./src/commands.json')
		let commands = JSON.parse(rawdata)
		let binFiles = {}

		if(MonkeOS.isInstalled())
		{
			const binDirSys = new BinDirSys()

			binFiles = binDirSys.getFiles()
		}
		this.commands = {
			...commands,
			...binFiles
		}
	}

	showNotFoundError(command)
	{
		console.log(`error: command "${command}" is invalid`)
	}

	static makePrompt(text, next)
	{
		process.stdout.write(text)
		let rl = readline.createInterface({
			input: process.stdin
		})
		let result;

		rl.question('', command => {
			result = command

			rl.close()
			
			next(result)
		})
	}
}

module.exports = CLI