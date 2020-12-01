const express = require('express');
const { findById, createRequest, updateStateById, deleteById } = require('../middlewares/controller');
const autorization = require('../middlewares/authorization');
const autentication = require('../middlewares/authentication');
const orderModel = require('../database/model_order/orderModel');
const router = express.Router();

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

router.delete("/delete/:id", authentication, authorization, (req, res) => {
	let id = req.params.id;
	deleteById(id)
	  .then((response) => {
		res.status(200).json(response);
	  })
	  .catch((error) => {
		res.status(error.status).json(error.message);
	  });
});


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

router.get('/orders', autentication, (req, res) => {
	orderModel
    .findAll()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(500);
    });
});


module.exports = router;