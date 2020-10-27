const jwt = require('jsonwebtoken');
require('dotenv').config();

const autentication = (req, res, next) => {
	let authorization = req.headers.authorization;
	if (authorization) {
		let token = authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET, (error, decoded) => {
			if (error) {
				res.status(401).json('token no valido');
			}
			req.usuario = decoded;
			next();
		});
	} else {
		res.status(401).json('por favor ingresa con tu usuario y contraseña');
	}
};

module.exports = autentication;