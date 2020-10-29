const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const userModel = require('../database/model_user/userModel');
const productModel = require('../database/model_product/productModel');
const requestModel = require('../database/model_request/requestModel');

require('dotenv').config();

/*USERS*/
//Login users
const loginUser = (recibed_password, recibed_email) => {
    return new Promise(async (res, rejc) => {
        if (!recibed_email || !recibed_password) {
            rejc({ status: 400, message: 'Fields are missing, please fill in completely' });
        } else {
            let user = await userModel.findOne({
                where: { [Op.and]: [{ email: recibed_email }, { password: recibed_password }] },
            });

            if (user) {
                const {	dataValues: { password }} = user;
				if (password === recibed_password) {
					res(jwt.sign(user.dataValues, process.env.SECRET));
				} else {
					rejc({ status: 401, message: 'Incorrect password' });
				}
            } else {
                rejc({ status: 401, message: `Incorrect username or passwords` });
            }
        }
    });
};

//Create users
const createUser = (data) => {
    return new Promise((res, rejc) => {
        if (!data.name || !data.email || !data.password || !data.telephone || !data.address || !data.email) {
            rejc({ status: 400, message: 'Please fill all fields'});
        } else {
            userModel
                .create(data)
                .then((user) => {
                    res(user);
                })
                .catch((error) => {
                    if (error.fields.email) {
                        rejc({ status: 400, message: 'Email is already registered, try another' });
                    } else {
                        rejc({ status: 500, message: 'Oh oh, We have server problems, please try again later.' });
                    }
                });
        }
    });
};

/*PRODUCTS*/
// Create product
const createProduct = (data) => {
	return new Promise((res, rejc) => {
		productModel
			.create(data)
			.then((product) => {
				res(product);
			})
			.catch((error) => {
				if ((error.name = 'SequelizeValidationError')) {
					rejc({ status: 400, message: `the field: ${error.errors[0].path} was not sent` });
				} else {
					rejc({ status: 500, message: 'Oh oh, We have server problems, please try again later.' });
				}
			});
	});
};

// update product by id
const updateProductById = (id, data) => {
	return new Promise((res, rejc) => {
		productModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res('product updated successfully');
				} else {
					rejc({ status: 400, message: 'Could not update the product.'});
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'Oh oh, We have server problems, please try again later.' });
			});
	});
};

// delete product by id
const deleteProduct = (id) => {
	return new Promise((res, rejc) => {
		productModel
			.destroy({ where: { id: id } })
			.then((response) => {
				if (response === 1) {
					res('Product removed successfully');
				} else {
					rejc({ status: 400, message: 'Product not found, please check the fields' });
				}
			})
			.then((error) => {
				rejc({ status: 500, message: 'Oh oh, We have server problems, please try again later' });
			});
	});
};


/* REQUEST */
// create request
const createRequest = (data) => {
	return new Promise((res, rejc) => {
		if (data.products && Array.isArray(data.products)) {
            const { products, ...request } = data;
			requestModel.create(request).then(async(request) => {
				try {
					products.forEach((product) => {
						request.addProducts(product.id, { through: { quantity: product.quantity } });
					});
					res(request);
				} catch (error) {
					console.log(request.id);
					await requestModel.destroy({ where: { id: request.id } });
					rejc({ status: 500, message: 'You must enter with your username and password to use this service' });
				}
			}).catch((error) => {
				console.log(error);
			});
		} else {
			rejc({ status: 400, message: 'Invalid fields' });
        }
	});
};

//find request by id

const findById = (reqid) => {
	return new Promise((res, rejc) => {
		if (!reqid) {
			rejc({ status: 400, message: 'The ID is missing, please send it' });
		} else {
			requestModel
				.findAll({ where: { id: reqid }, include: [productModel, userModel], raw: true, nest: true })
				.then((response) => {
					res(response);
				})
				.catch((error) => {
					res(error);
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
					console.log(response);
					if (response[0] === 1) {
						res('Order status updated successfully');
					} else {
						rejc({ status: 400, message: 'Could not update your order.' });
					}
				})
				.catch((error) => {
					rejc({ status: 500, message: 'Oh oh, We have server problems, please try again later.' });
				});
		} else {
			rejc({ status: 400, message: 'Invalid fields' });
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