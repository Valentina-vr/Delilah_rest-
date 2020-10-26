const {​​ DataTypes }​​ = require('sequelize');
const sequelize = require('../db');
const requestModel = require('../model_request/request');

const productModel = sequelize.define(
    'products',
    {​​
        name: {​​
            type: DataTypes.STRING(50),
            allowNull: false,
        }​​,

        description: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        type: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        price: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        imagen: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,
    }​​,
    {​​timestamps: false}​​
);
module.exports = productModel;