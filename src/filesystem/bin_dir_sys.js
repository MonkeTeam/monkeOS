const fs = require('fs')
const Config = require('../config.js')
const FileSystem = require('../utils/filesystem.js')

class BinDirSys
{
	constructor()
	{
		this.config = new Config()
		this.root_path = this.config.get('installation_path')
		this.bin_path = this.root_path + '/bin'
	}

	createFiles()
	{
		let data = {};
		this.root_path = this.config.get('installation_path')

		data.whodis = "dis is voss";

		FileSystem.writeFileHex(this.bin_path, JSON.stringify(data))

		console.log("Binary files created...")
	}

	getFiles()
	{
		let data = FileSystem.readFileHex(this.bin_path)
		data = JSON.parse(data)
		return data
	}
}

module.exports = BinDirSys