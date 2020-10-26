const {​​ DataTypes }​​ = require('sequelize');
const sequelize = require('../db');
const productModel = require('../model_product/product');
const userModel = require('../model_user/user');

const requestModel = sequelize.define(
    'requests',
    {​​
        userId: {​​
            type: DataTypes.INTEGER,
            allowNull: false,
        }​​,

        request_date: {​​
            type: DataTypes.DATE,
            allowNull: false,
        }​​,

        state: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        pay_method: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,
    }​​,
    {​​timestamps: false}​​
);

userModel.hasMany(requestModel);
requestModel.belongsTo(userModel, {​​}​​);
module.exports = requestModel;