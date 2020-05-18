const Sequelize = require('sequelize')
const productModel = require('../models/product')


const sequelize = new Sequelize('productos', 'root', 'root', {
    host: 'mysql',
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
    });

module.exports = {
    product
}