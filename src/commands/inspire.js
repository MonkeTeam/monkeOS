const fetch = require('node-fetch');

class Inspire
{
	constructor() {
       
    }

	run(next)
	{ 
        fetch("https://api.quotable.io/random")
        .then((res) => {
          if (!res.ok) {
            throw Error("Network issue found!");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.content);
          console.log(" -" + data.author);
        })
        .catch((err) => {
            console.log(err.message);
        });

		next()
	}
}

module.exports = Inspire