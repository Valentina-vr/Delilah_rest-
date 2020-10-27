const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const userModel = require('../database/model_user/userModel');
const productModel = require('../database/model_product/productModel');
const requestModel = require('../database/model_request/requestModel');

require('dotenv').config();

//Usuarios
const loginUser = (recibed_password, recibed_email) => {
    return new Promise(async (res, rejc) => {
        if (!recibed_email || !recibed_password) {
            rejc({ status: 400, message: 'Faltan campos, por favor rellene por completo' });
        } else {
            let user = await userModel.findOne({
                where: { [Op.and]: [{ email: recibed_email }, { password: recibed_password }] },
            });

            if (user) {
                const {	dataValues: { password }} = user;
				if (password === recibed_password) {
					res(jwt.sign(user.dataValues, process.env.SECRET));
				} else {
					rejc({ status: 401, message: 'Contraseña invalida' });
				}
            } else {
                rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
            }
        }
    });
};

const createUser = (data) => {
    return new Promise((res, rejc) => {
        if (!data.name || !data.email || !data.password || !data.telephone || !data.address || !data.email) {
            rejc({ status: 400, message: 'Faltan campos, por favor rellene por completo'});
        } else {
            userModel
                .create(data)
                .then((user) => {
                    res(user);
                })
                .catch((error) => {
                    if (error.fields.email) {
                        rejc({ status: 400, message: 'El email ya existe' });
                    } else {
                        rejc({ status: 500, message: 'Oh no, tenemos problemas intenta de nuevo más tarde' });
                    }
                });
        }
    });
};

//Products
const createProduct = (data) => {
	return new Promise((res, rejc) => {
		productModel
			.create(data)
			.then((product) => {
				res(product);
			})
			.catch((error) => {
				if ((error.name = 'SequelizeValidationError')) {
					rejc({ status: 400, message: `el campo ${error.errors[0].path} no fue enviado` });
				} else {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				}
			});
	});
};

const updateProductById = (id, data) => {
	return new Promise((res, rejc) => {
		productModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res('el producto fue actualizado');
				} else {
					rejc({ status: 400, message: 'No se Pudo actualizar el producto.' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intente de nuevo mas tarde.' });
			});
	});
};

const deleteProduct = (id) => {
	return new Promise((res, rejc) => {
		productModel
			.destroy({ where: { id: id } })
			.then((response) => {
				if (response === 1) {
					res('producto eliminado');
				} else {
					rejc({ status: 400, message: 'el producto no existe, no puede ser eliminado' });
				}
			})
			.then((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

//Orders
// create request
const createRequest = (data) => {
	return new Promise((res, rejc) => {
		if (data.products && Array.isArray(data.products)) {
			const { products, ...request } = data;

			requestModel
				.create(request)
				.then((request) => {
					products.forEach(async (product) => {
						try {
							await request.addProducts(product);
							res(request);
						} catch (error) {
							console.log(error);
						}
					});
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			rejc({ status: 400, message: 'Campos enviados no validos' });
		}
	});
};

//find request by id(controller)
const findById = (reqid) => {
	return new Promise((res, rejc) => {
		if (!reqid) {
			rejc({ status: 400, message: 'Faltan el id, por favor envielo' });
		} else {
			requestModel
				.findAll({ where: { id: reqid }, include: [productModel, userModel], raw: true, nest: true })
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});
};

//Update state request
const updateStateById = (id, data) => {
	return new Promise((res, rejc) => {
		if (data.hasOwnProperty('state') && id) {
			requestModel
				.update({ state: data.state }, { where: { id: id } })
				.then((response) => {
					if (response[0] === 1) {
						res('Estado de el pedido actualizado');
					} else {
						rejc({ status: 400, message: 'No se Pudo actualizar tu pedido.' });
					}
				})
				.catch((error) => {
					rejc({ status: 500, message: 'intente de nuevo mas tarde.' });
				});
		} else {
			rejc({ status: 400, message: 'Campos no validos' });
		}
	});
};

module.exports = {
    createUser,
    loginUser,
    createProduct,
	updateProductById,
    deleteProduct,
    findById,
	createRequest,
	updateStateById,
};