//const jwt = require('jsonwebtoken');
//const router = express.Router;
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

//Database
const db = require('./database/index');

//Sincronizar las tablas de la base de datos
const requestModel = require('./database/model_request/requestModel');
const userModel = require('./database/model_user/userModel');
const productModel = require('./database/model_product/productModel');
const orderModel = require('./database/model_order/orderModel');
userModel.sync();
requestModel.sync();
productModel.sync();
orderModel.sync();

//Express
const app = express();
app.use(helmet());
app.use(express.json());

//Iniciando el servidor
app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo por el puerto '+process.env.PORT);
});

