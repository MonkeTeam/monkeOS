const fs = require('fs')
const FileSystem = require('../utils/filesystem.js')

class RootDirSys
{
	createRootDirectories()
	{
		this.createBinDir()
	}

	createBinDir()
	{
		const bin_dir_path = "/bin";

		if(FileSystem.exists(bin_dir_path))
		{
			console.log("Bin directory already exists! ... Skipping")
			return;
		}

		FileSystem.createFolder(bin_dir_path)
		console.log("Bin directory created!")
	}
}

module.exports = RootDirSys