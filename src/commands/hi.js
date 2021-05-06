class Hi
{
	constructor() {}

	run(next)
	{
		console.log("Hello there")
		next()
	}
}

module.exports = Hi