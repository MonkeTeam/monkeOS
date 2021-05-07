const Buffer = require('buffer').Buffer

class Encoder
{
	static toHex(data)
	{
		data = Buffer.from(data)
		return data.toString('hex')
	}

	static hexToString(data)
	{
		data = Buffer.from(data, 'hex')
		return data.toString()
	}
}

module.exports = Encoder