const Config = require('../config.js')
const fs = require('fs')
const Encoder = require('./encoder.js')

// this class is an utility class for all filesystem actions
class FileSystem
{
	static createFolder(path)
	{
		path = this.get_full_path(path)

		if(this.exists(path))
		{
			return false;
		}
		fs.mkdirSync(path, { recursive: true })
		return true
	}

	static createFile(path, content = '')
	{
		path = this.get_full_path(path)

		fs.writeFileSync(path, content, {
			encoding: 'utf-8',
			mode: 0o775
		})
	}

	static writeFileHex(path, data)
	{
		fs.writeFileSync(path, Encoder.toHex(data))
	}

	static writeFile(path, data)
	{
		fs.writeFileSync(path, data)
	}

	static readFileHex(path)
	{
		let data = fs.readFileSync(path, 'utf-8', 'r')
		data = Encoder.hexToString(data)
		return data
	}

	static readFile(path)
	{
		path = this.get_full_path(path)
		
		let data = fs.readFileSync(path, {
			encoding: 'utf-8',
			flag: 'r'
		})
		return data
	}

	static exists(path, without_full_path = false)
	{
		if(!without_full_path)
		{
			path = this.get_full_path(path)
		}

		return fs.existsSync(path)
	}

	static delete(path)
	{
		path = this.get_full_path(path)

		fs.unlinkSync(path)
	}

	static get_full_path(path)
	{
		let config = new Config()
		let installation_path = config.get('installation_path')
		return installation_path + path
	}

	static getFolderContents(path, without_full_path = false)
	{
		if(!without_full_path)
		{
			path = this.get_full_path(path)
		}

		return fs.readdirSync(path)
	}
}

module.exports = FileSystem