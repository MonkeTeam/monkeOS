const fs = require('fs')

class Config
{
	constructor()
	{
		this.file_name = "config.json"

		this.checkExistence()
	}

	checkExistence()
	{
		if(!fs.existsSync('./' + this.file_name))
		{
			fs.writeFileSync('./' + this.file_name, '{}', 'utf-8', 0o755)
			
			console.log("Created config file!")
		}
		return true
	}

	get(key)
	{
		const rawdata = fs.readFileSync('./' + this.file_name, 'utf-8', (error) => {
			if(error) throw error;
		})

		const data = JSON.parse(rawdata)

		if(key in data)
		{
			return data[key]
		}
		return false
	}

	set(key, value)
	{
		const rawdata = fs.readFileSync('./' + this.file_name, 'utf-8', (error) => {
			if(error) throw error;
		})

		const data = JSON.parse(rawdata)

		data[key] = value

		fs.writeFileSync('./' + this.file_name, JSON.stringify(data), (error) => {
			if(error) throw error;
		})
	}
}

module.exports = Config