const FileSystem = require('./utils/filesystem.js')
const Config = require('./config.js')

class JSOS
{
	static isInstalled()
	{
		let config = new Config()
		let installation_path = config.get('installation_path')

		if(!installation_path)
		{
			return false
		}

		return FileSystem.exists(installation_path)
	}
}

module.exports = JSOS