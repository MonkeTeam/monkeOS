const FileSystem = require('../utils/filesystem.js')
const Encoder = require('../utils/encoder.js')
const InvalidException = require('../exceptions/invalid_exception.js')
const file_metadata = require('ffmetadata')

class File
{
	// @param path string Path to save the file, i.e. /bin/mkdir
	// @param content string File content
	// @param owner integer UID of the owner of the file
	constructor(path, content = "", owner = null)
	{
		this.path = path
		this.content = content
		this.owner = owner
	}

	save()
	{
		if(this.path.charAt(0) != '/')
		{
			throw new InvalidException("Invalid path given")
		}
		let file_data = {
			content: this.content,
			owner: this.owner
		}

		this._storeFile(file_data)
	}

	read()
	{
		if(this.path.charAt(0) != '/')
		{
			throw new InvalidException("Invalid path given")
		}

		this.content = FileSystem.readFile(this.path)

		return this.content
	}

	_storeFile(file_data)
	{
		let path_items = this.path.split('/')
		// to delete the first item which will be ''
		path_items.shift()

		if(path_items.length > 1)
		{
			let folders = path_items.slice(0, path_items.length - 1)
			folders = '/' + folders.join('/')

			FileSystem.createFolder(folders)
		}

		FileSystem.createFile(this.path, file_data.content)
	}
}

module.exports = File