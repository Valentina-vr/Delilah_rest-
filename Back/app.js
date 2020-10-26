const express = require('express');
const helmet = require('helmet');
//const jwt = require('jsonwebtoken');
const router = express.Router;

//Database
const db = require('./database/db');

//Sincronizar las tablas de la base de datos
const requestModel = require('./database/model_request/request');
const userModel = require('./database/model_user/user');
const productModel = require('./database/model_product/product');
const orderModel = require('./database/model_order/order');
userModel.sync();
requestModel.sync();
productModel.sync();
orderModel.sync();

const app = express();
app.use(helmet());
app.use(express.json());

//Iniciando el servidor
app.listen(3000, ()=> {
    console.log('Servidor corriendo por el puerto 3000');
});

