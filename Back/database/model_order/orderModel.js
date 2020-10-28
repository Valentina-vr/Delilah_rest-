const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const requestModel = require('../model_request/requestModel');
const productModel = require('../model_product/productModel');

const orderModel = sequelize.define(
	'orders',
	{
		requestId: {
			type: DataTypes.INTEGER,
			references: {
				model: requestModel,
				key: 'id',
			},
			allowNull: false,
		},
		productId: {
			type: DataTypes.INTEGER,
			references: {
				model: productModel,
				key: 'id',
			},
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{ timestamps: false }
);

productModel.belongsToMany(requestModel, { through: orderModel });
requestModel.belongsToMany(productModel, { through: orderModel });

module.exports = orderModel;
