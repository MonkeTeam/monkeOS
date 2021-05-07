const fs = require('fs')
const FileSystem = require('../utils/filesystem.js')
const File = require('./file.js')

class BinDirSys
{
	constructor()
	{
		this.bin_path = '/bin'
	}

	createFiles()
	{
		let data = {};

		data.whodis = "dis is monke";

		// FileSystem.writeFile(this.bin_path , JSON.stringify(data))

		let file = new File(this.bin_path + '/whodis', "console.log('working bruh')", 0)

		file.save()

		console.log("Binary files created...")
	}

	getFiles()
	{
		let bin_files = FileSystem.getFolderContents(this.bin_path)

		let data = {}

		for(let i = 0; bin_files.length > i; i++)
		{
			data[bin_files[i]] = this.bin_path  + '/' + bin_files[i]
		}

		return data
	}
}

module.exports = BinDirSys