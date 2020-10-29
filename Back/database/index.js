const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('delilah_resto', process.env.USER, process.env.PASS,{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Base de datos conectada');
})
.catch(error => {
    console.log('Base de datos desconectada');
});

module.exports = sequelize;