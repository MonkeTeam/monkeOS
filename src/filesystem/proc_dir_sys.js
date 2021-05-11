const fs = require('fs')
const FileSystem = require('../utils/filesystem.js')

class ProcDirSys
{
	constructor()
	{
		this.proc_path = ProcDirSys.proc_path
	}

	createFolder()
	{
		FileSystem.createFolder(this.proc_path)

		console.log('/proc directory created!')
	}
}

ProcDirSys.proc_path = "/proc"

module.exports = ProcDirSys