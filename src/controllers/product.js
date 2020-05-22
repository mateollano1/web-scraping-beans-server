const router = require('express').Router();
const productService = require('../services/product')
const productScraping = require('../services/productScraping')
const mailService = require('../services/mail');

router.post('/', async(req, res) => {
    let products = await productScraping.getResults()
    try {
        await productService.saveProducts(products)
    } catch (error) {
        mailService.sendMail("Error al momento de guardar la información en base de datos.")
    }
    res.json(products)
})

router.get('/', async(req, res) => {
    let products = await productService.getAllProducts()
    res.json(products)
})

router.get('/:name/:date', async(req, res) => {
    let products = await productService.getproductByNameAndDate(req.params.name, req.params.date)
    res.json(products)
})

router.get('/:name', async(req, res) => {
    let products = await productService.getProductByName(req.params.name)
    res.json(products)

})

module.exports = router;