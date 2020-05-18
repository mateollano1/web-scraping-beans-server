const { product } = require('../repository/product')

getAllProducts = () => {
    return product.findAll()
}

getProductByName = (name) => {
    return product.findAll({ where: { name: name } })
}

saveProducts = (products) => {
    products['data'].map(function(index) {
        product.create(index)
    })
}

module.exports = {
    getAllProducts,
    getProductByName,
    saveProducts
}