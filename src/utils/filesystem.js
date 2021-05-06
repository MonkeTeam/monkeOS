const fs = require('fs')
const Buffer = require('buffer').Buffer

class FileSystem
{
	static createFile(path, permission)
	{
		fs.writeFileSync(path, '', 'utf-8', permission)
	}

	static writeFileHex(path, data)
	{
		data = Buffer.from(data)
		fs.writeFileSync(path, data.toString('hex'))
	}

	static readFileHex(path)
	{
		let data = fs.readFileSync(path, 'utf-8', 'r')
		data = Buffer.from(data, 'hex')
		return data.toString()
	}

	static exists(path)
	{
		return fs.existsSync(path)
	}
}

module.exports = FileSystem