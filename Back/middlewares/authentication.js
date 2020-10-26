const autorization = (req, res, next) => {​​
    console.log(req.usuario);
    const {​​ isAdmin }​​ = req.usuario;

    if (isAdmin !== 1) {​​
        res.status(401).json('Permisos insuficientes');
    }​​ else {​​
        next();
    }​​
}​​;

module.exports = autorization;