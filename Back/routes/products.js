const auntentication = require('../middlewares/authentication');
const productModel = require('../database/model_product/productModel');
const { createProduct, updateProductById, deleteProduct } = require('../middlewares/controller');

const express = require('express');
const autorization = require('../middlewares/authorization');
//PRODUCT ROUTES
const router = express.Router();

// Get Products
router.get('/getall', auntentication, (req, res) => {
	productModel
		.findAll()
		.then((products) => {
			res.status(200).json(products);
		})
		.catch((error) => {
			res.status(500);
		});
});

//Create Product
router.post('/create', auntentication, autorization, (req, res) => {
	const data = req.body;
	createProduct(data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json(error.message);
		});
});

//Update Product
router.patch('/update/:id', auntentication, autorization, (req, res) => {
	let id = req.params.id;
	let data = req.body;
	updateProductById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json(error.message);
		});
});
//Delete Product
router.delete('/delete/:id', auntentication, autorization, (req, res) => {
	let id = req.params.id;
	let data = req.body;
	deleteProduct(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json(error.message);
		});
});

module.exports = router;