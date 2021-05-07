const clearCli = require('clear');

class Clear
{

	run(next)
	{
        clearCli()/* clear the terminal */
        next()
	}
}

module.exports = Clear