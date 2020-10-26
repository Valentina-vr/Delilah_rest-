const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const userModel = require('../database/model_user/user');
require('dotenv').config();

const createUser = (data) => {
    return new Promise((res, rejc) => {
        if (!data.name || !data.email || !data.password || !data.telephone || !data.address || !data.email) {
            rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
        } else {
            userModel
                .create(data)
                .then((user) => {
                    res(user);
                })

                .catch((error) => {
                    if (error.fields.email) {
                        rejc({ status: 400, message: 'Este email ya esta registrado' });
                    } else {
                        rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
                    }
                });
        }
    });

};

const loginUser = (recibed_password, recibed_email) => {
    return new Promise(async (res, rejc) => {
        if (!recibed_email || !recibed_password) {
            rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
        } else {
            let user = await userModel.findOne({
                where: { [Op.and]: [{ email: recibed_email }, { password: recibed_password }] },
            });

            if (user) {
                delete user.password;
                res(jwt.sign(user, config.jwtsecret));

            } else {
                rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
            }
        }
    });
};


module.exports = {
    createUser,
    loginUser,

};