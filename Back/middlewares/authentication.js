const jwt = require('jsonwebtoken');
require('dotenv').config();

const autentication = (req, res, next) => {
	let authorization = req.headers.authorization;
	if (authorization) {
		let token = authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET, (error, decoded) => {
			if (error) {
				res.status(401).json('invalid token');
			}
			req.usuario = decoded;
			next();
		});
	} else {
		res.status(401).json('please log in with your username and password');
	}
};

module.exports = autentication;