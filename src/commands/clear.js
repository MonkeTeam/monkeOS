const clearCli = require('clear');

class clear
{

	run(next)
	{
        clearCli()/* clear the terminal */
        next()
	}
}

module.exports = clear