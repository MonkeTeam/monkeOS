const fs = require('fs')
const os = require('os')
const CLI = require('../cli.js')
const RootDirSys = require('../filesystem/root_dir_sys.js')
const BinDirSys = require('../filesystem/bin_dir_sys.js')
const Config = require('../config.js')

class OSSetup
{
	constructor()
	{
		this.config;
	}

	run(next)
	{
		this.config = new Config()
		console.log("Setting up OS...")

		this.choosePath(next)
	}

	choosePath(next_cmd)
	{
		const path = this.config.get('installation_path');

		if(path)
		{
			console.log("Choosing installation path from config.json file...")
			console.log("Choosed " + path + " as installation path")
			this.createDir(path)

			next_cmd()	
		}
		else
		{
			const _this = this
			CLI.makePrompt("Choose an installation path: ", result => {
				console.log(`Choosed "` + result + `" as installation path`)
				_this.createDir(result)

				console.log("OS successfully installed! Restart the OS")
			})
		}
	}

	createDir(path)
	{
		console.log("Creating directory for the OS...")
		const homedir = os.homedir()

		path = path.replace("~", homedir)

		if(!fs.existsSync(path))
		{
			fs.mkdirSync(path, {
				mode: 0o777
			})
		}

		this.createOSDirectories(path)

		this.config.set('installation_path', path)

		this.createBinFiles(path)
	}

	createOSDirectories(path)
	{
		const root_dir_sys = new RootDirSys()

		root_dir_sys.createRootDirectories(path)
	}

	createBinFiles(path)
	{
		const bin_dir_sys = new BinDirSys()

		bin_dir_sys.createFiles()
	}
}

module.exports = OSSetup