const readline = require('readline')
const fs = require('fs')
const BinDirSys = require('./filesystem/bin_dir_sys.js')
const MonkeOS = require('./monke-os.js')
const File = require('./filesystem/file.js')
const Config = require('./config.js')

class CLI
{
	constructor()
	{
		this.rl;
		this.commands;
	}

	init()
	{
		// init readline object, which will be used to create cli
		// output is not given, because when it was given, every command gave
		// by user was printing out 
		this.rl = readline.createInterface({
			input: process.stdin
		})

		// first show the welcome message, then load all the commands, then
		// run the cli so user can input any command
		this.showWelcomeMessage()
		this.loadCommands()
		this.run()

		// on exiting the cli, this is triggered
		this.rl.on('close', () => {
			console.log("\nExiting...")
		})
	}

	run()
	{
		let _this = this
		// show this at starting of command input
		process.stdout.write(">_ ")

		// this opens up an input where user can give command
		this.rl.question('', command => {
			// if the given command exists in command list or not
			let command_items = command.split(' ')
			command = command_items[0]
			let arg = '';
			if(command_items.length > 1)
			{
				arg = command_items.slice(1)
			}

			if(command in _this.commands)
			{
				// if the command's value is null, it is system's internal command
				if(_this.commands[command] == null)
				{
					// load the command file and run it
					let cmd = require('./commands/' + command + '.js')
					cmd = new cmd(arg)
					cmd.run(() => {
						// this is to run the run() function again so user can
						// provide another command
						_this.run()
					})
				}
				else
				{
					// if it's not system's default command, then it will 
					// be a bin file from filesystem
					_this.runBinFile(_this.commands[command], arg)
					// this is to run the run() function again so user can
					// provide another command
					_this.run()
				}
			}
			else
			{
				// if the given command doesn't exist in command list, then
				// show notFound error
				_this.showNotFoundError(command)
				// run the run() function again
				_this.run()
			}
		})
	}

	showWelcomeMessage()
	{
		console.log(`monke-OS v0.0.1`)
	}

	loadCommands()
	{
		// load the commands data from commands.json file
		// commands in commands.json are system's internal command
		const rawdata = fs.readFileSync('./src/commands.json')
		let commands = JSON.parse(rawdata)
		// object to store the bin files from filesystem
		let binFiles = {}

		// if MonkeOS is installed, then load the bin files
		if(MonkeOS.isInstalled())
		{
			const binDirSys = new BinDirSys()

			binFiles = binDirSys.getFiles()
		}
		// merge the system's internal commands and bin files into this.commands
		this.commands = {
			...commands,
			...binFiles
		}
	}

	showNotFoundError(command)
	{
		console.log(`error: command "${command}" is invalid`)
	}

	// this is to show a prompt like `what's your name? USER's INPUT HERE`
	// @param text string Show text about what the prompt is about
	// @param next callback Return's result after entering the command
	static makePrompt(text, next)
	{
		// show text first
		process.stdout.write(text)
		// create input interface
		let rl = readline.createInterface({
			input: process.stdin
		})
		let result;

		// show input interface
		rl.question('', command => {
			result = command

			rl.close()
				
			// pass the result to the callback
			next(result)
		})
	}

	runBinFile(path, arg)
	{
		let file = new File(path)

		let file_content = file.read()

		let config = new Config()

		const ROOT_PATH = config.get('installation_path')

		const MONKE_OS = MonkeOS

		this.runBinFileContent(file_content, arg, ROOT_PATH, MONKE_OS)
	}

	runBinFileContent(file_content, arg, ROOT_PATH, MONKE_OS)
	{
		eval(`
			"use strict";
			`+ file_content +`
		`)
	}
}

module.exports = CLI