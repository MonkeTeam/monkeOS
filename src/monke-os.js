const FileSystem = require('./utils/filesystem.js')
const Config = require('./config.js')
const InvalidException = require('./exceptions/invalid_exception.js')

class MonkeOS
{
	static isInstalled()
	{
		let config = new Config()
		let installation_path = config.get('installation_path')

		if(!installation_path)
		{
			return false
		}

		return FileSystem.exists(installation_path, true)
	}

	static runProcess(process_name)
	{
		if(!MonkeOS.isInstalled()) throw new InvalidException("MonkeOS is not installed yet")

		let process = require('./processes/' + process_name + '.js')

		process = new process()
		process.run()
	}

	static abortProcess(process_name)
	{
		if(!MonkeOS.isInstalled()) throw new InvalidException("MonkeOS is not installed yet")
		
		let process = require('./processes/' + process_name + '.js')

		process = new process()
		process.abort()
	}
}

module.exports = MonkeOS