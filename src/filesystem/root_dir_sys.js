const fs = require('fs')
const FileSystem = require('../utils/filesystem.js')

class RootDirSys
{
	createRootDirectories(os_path)
	{
		this.createBinDir(os_path)
	}

	createBinDir(os_path)
	{
		const bin_dir_path = os_path + "/bin";

		if(fs.existsSync(bin_dir_path))
		{
			console.log("Bin directory already exists! ... Skipping")
			return;
		}

		FileSystem.createFile(bin_dir_path, 0o755)
		console.log("Bin directory created!")
	}
}

module.exports = RootDirSys