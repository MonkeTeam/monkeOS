const Error = require('./error.js')

class AlreadyExistsException extends Error
{
	constructor(message)
	{
		super(message)

		this.name = "AlreadyExistsException"
	}
}

module.exports = AlreadyExistsException