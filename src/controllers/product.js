const router = require('express').Router();
const productService = require('../services/product')
const productScraping = require('../services/productScraping')

router.post('/', async(req, res) => {

    let products = await productScraping.getResults()
    await productService.saveProducts(products)
    res.json(products)
})

router.get('/', async(req, res) => {
    let products = await productService.getAllProducts()
    res.json(products)
})

router.get('/:name', async(req, res) => {
    let products = await productService.getProductByName(req.params.name)
    res.json(products)

})

module.exports = router;