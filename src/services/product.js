const { product } = require('../repository/product')
const { Op } = require("sequelize");
getAllProducts = () => {
    return product.findAll()
}

getProductByName = async(name) => {
    return await product.findAll({
        where: {
            name: name
        }
    })
}

getproductByNameAndDate = (name, date) => {

    return product.findAll({
        where: [
            { name: name },
            {
                createdAt: date
            }
        ]
    })
}

saveProducts = (products) => {
    products['data'].map(function(index) {
        product.create(index)
    })
}

module.exports = {
    getAllProducts,
    getProductByName,
    saveProducts,
    getproductByNameAndDate
}