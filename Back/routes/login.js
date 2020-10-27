const express = require('express');
const { createUser, loginUser } = require('../middlewares/controller');


const router = express.Router();

router.post('/create', (req, res) => {
    const reqUser = req.body;
    reqUser.isAdmin = true;

    createUser(reqUser)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

router.post('/login', (req, res) => {
    const { password, email } = req.body;
    loginUser(password, email)
        .then((jwt) => {
            res.status(200).json(jwt);
        })
        .catch((error) => {
            res.status(error.status).json(error.message);
        })
});

module.exports = router;