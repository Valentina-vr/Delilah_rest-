const { DataTypes } = require('sequelize');
const { models } = require('../index');
const sequelize = require('../index');
const productModel = require('../model_product/productModel');
const userModel = require('../model_user/userModel');

const requestModel = sequelize.define(
	'requests',
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		request_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pay_method: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

userModel.hasMany(requestModel);
requestModel.belongsTo(userModel, {});
module.exports = requestModel;
