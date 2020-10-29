const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('delilah_resto', process.env.USER, process.env.PASS,{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Database connected successfully');
})
.catch(error => {
    console.log('Database disconnected');
});

module.exports = sequelize;