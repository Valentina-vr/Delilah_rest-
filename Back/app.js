const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

//Database
const db = require('./database/index');

//Model synchronization
const requestModel = require('./database/model_request/requestModel');
const userModel = require('./database/model_user/userModel');
const productModel = require('./database/model_product/productModel');
const orderModel = require('./database/model_order/orderModel');
userModel.sync();
requestModel.sync();
productModel.sync();
orderModel.sync();

//Routes
const userRoutes = require('./routes/login');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

//Express
const app = express();
app.use(helmet());
app.use(express.json());

//Routes Implementation
app.use('/users', userRoutes);
app.use('/product', productsRoutes);
app.use('/request', ordersRoutes);

//Starting the server
app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo por el puerto '+process.env.PORT);
});

