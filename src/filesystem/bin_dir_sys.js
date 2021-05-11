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
		let bin_files = FileSystem.getFolderContents('./src/system_core/bin_files', true)

		for(let bin_file of bin_files)
		{
			let content = fs.readFileSync('./src/system_core/bin_files/' + bin_file, {
				encoding: 'utf-8',
				flag: 'r'
			})

			this._createBinFile(bin_file, content)
		}

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

	_createBinFile(name, content)
	{
		name = name.replace('.js', '')
		
		let file = new File(this.bin_path + '/' + name, content, 0)

		file.save()
	}
}

module.exports = BinDirSys