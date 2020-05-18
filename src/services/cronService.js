const productScraping = require('./productScraping');
const productService = require('./product');

saveCronScraping = async() => {
    let products = await productScraping.getResults()
    await productService.saveProducts(products)
}

module.exports = {
    saveCronScraping
}