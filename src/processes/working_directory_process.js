const Config = require('../config.js')
const File = require('../filesystem/file.js')
const FileSystem = require('../utils/filesystem.js')
const Process = require('./process.js')
const ProcDirSys = require('../filesystem/proc_dir_sys.js')
const InvalidException = require('../exceptions/invalid_exception.js')

class WorkingDirectoryProcess extends Process
{
	constructor()
	{
		super()

		this.path = ProcDirSys.proc_path
		this.config = new Config()
		this.root_path = this.config.get('installation_path')

		this.file_name = '/working_directory'
	}

	run()
	{
		if(FileSystem.exists(this.path + this.file_name))
		{
			throw new InvalidException("The process already running")
		}

		super.run()

		let content = {
			content: "/"
		}
		content = JSON.stringify(content)

		let file = new File(this.path + this.file_name, content)

		file.save()
	}

	abort()
	{
		super.abort()

		let file = new File(this.path + this.file_name)

		file.delete()
	}
}

module.exports = WorkingDirectoryProcess