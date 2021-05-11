const fs = require('fs')

try
{
	MONKE_OS.runProcess('working_directory_process')
}
catch(error)
{
	if(error.name != "InvalidException")
	{
		console.log(error.name, error.message)
	}
}

let content = fs.readFileSync(ROOT + '/proc/working_directory.json')
content = content.toString()

content = JSON.parse(content)

console.log(content.content)
