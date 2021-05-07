const Error = require('./error.js')

class InvalidException extends Error
{
	constructor(message)
	{
		super(message)

		this.name = "InvalidException"
	}
}

module.exports = InvalidException