const Sequelize = require('sequelize')
const productModel = require('../models/product')
const mailService = require('../services/mail');

const sequelize = new Sequelize('productos', 'root', 'root', {
    host: 'mysql',
    // host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 80,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
const product = productModel(sequelize, Sequelize)


sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    }).catch(() => {
        mailService.sendMail("Error al intentar establecer conexión con base de datos.")
    });

module.exports = {
    product
}