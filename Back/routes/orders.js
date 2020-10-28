const express = require('express');
//CONTROLLER
const { findById, createRequest, updateStateById } = require('../middlewares/controller');
//MIDDLEWARES
const autorization = require('../middlewares/authorization');
const autentication = require('../middlewares/authentication');

// ORDER ROUTES
const router = express.Router();

//Create order
router.post('/create', autentication, (req, res) => {
	let data = req.body;
	console.log(data)
	data.request_date = new Date();
	data.state = 'nuevo';
	createRequest(data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json(error.message);
		});
});

//Get request by id
router.get('/get/:id', autentication, autorization, (req, res) => {
	let id = req.params.id;
	findById(id)
	.then((response)=>{
		res.status(200).json(response);
	})
	.catch((error)=>{
		res.status(error.status).json(error.message);
	});

});

//Update state of request
router.patch('/update/:id', autentication, autorization, (req, res) => {
	let id = req.params.id;
	let data = req.body;
	updateStateById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json(error.message);
		});
});

module.exports = router;