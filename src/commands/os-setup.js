const fs = require('fs')
const Path = require('path')
const os = require('os')
const CLI = require('../cli.js')
const RootDirSys = require('../filesystem/root_dir_sys.js')
const BinDirSys = require('../filesystem/bin_dir_sys.js')
const ProcDirSys = require('../filesystem/proc_dir_sys.js')
const Config = require('../config.js')

// this class is for setting up the OS
class OSSetup
{
	constructor()
	{
		this.config;
	}

	// triggered when `os-setup` command is run
	// @param next callback W
	run(next)
	{
		this.config = new Config()
		console.log("Setting up OS...")

		// process choosing path to install the OS
		this.choosePath()
	}

	choosePath()
	{
		const path = this.config.get('installation_path');

		if(path)
		{
			// if installation path already exists in config.json, use the path value
			console.log("Choosing installation path from config.json file...")
			console.log("Choosed " + path + " as installation path")

			// create the given directory
			this.createDir(path)

			console.log("OS successfully installed! Restart the OS")			
		}
		else
		{
			const _this = this
			// show a prompt to get input of installation path
			CLI.makePrompt("Choose an installation path: ", result => {
				console.log(`Choosed "` + result + `" as installation path`)
	
				// create the given directory
				_this.createDir(result)
			})
		}
	}

	createDir(path)
	{
		console.log("Creating directory for the OS...")
		const homedir = os.homedir()

		// replaces ~ with home directory of the user's host system
		path = path.replace("~", homedir)

		if(path.charAt(0) != '/')
		{
			path = Path.resolve('.') + '/' + path
		}

		// if the directory doesn't exists, create the directory
		if(!fs.existsSync(path))
		{
			// add permission (mode) `777` to the directory
			fs.mkdirSync(path, {
				mode: 0o777
			})
		}

		// update the `installation_path` data in config.json
		this.config.set('installation_path', path)

		// create OS's required directories
		this.createOSDirectories()

		// create files under bin directory
		this.createBinFiles()

		// create proc folder for all system processes
		this.createProcFolder()
	}

	createOSDirectories()
	{
		const root_dir_sys = new RootDirSys()

		root_dir_sys.createRootDirectories()
	}

	createBinFiles()
	{
		const bin_dir_sys = new BinDirSys()

		bin_dir_sys.createFiles()
	}

	createProcFolder()
	{
		const proc_dir_sys = new ProcDirSys()

		proc_dir_sys.createFolder()
	}
}

module.exports = OSSetup