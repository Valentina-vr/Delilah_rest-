const {​​ DataTypes }​​ = require('sequelize');
const sequelize = require('../db');

const userModel = sequelize.define(
    'users',
    {​​
        name: {​​
            type: DataTypes.STRING(50),
            allowNull: false,
        }​​,

        email: {​​
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }​​,

        password: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        telephone: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        address: {​​
            type: DataTypes.STRING,
            allowNull: false,
        }​​,

        isAdmin: {​​
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }​​,
    }​​,
    {​​timestamps: false}​​
);

module.exports = userModel;