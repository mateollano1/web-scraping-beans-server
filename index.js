// Packages
const express = require('express')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cron = require('node-cron');
var createError = require('http-errors');
const app = express();
//  Routes
const { product } = require('./src/repository/product');
const api = require('./src/controllers/index');
const cronService = require('./src/services/cronService');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log(`¡Aplicación escuchando en el puerto 3000!`)
    cron.schedule("30 20 * * *", () => {
        console.log('Recogiendo datos');
        cronService.saveCronScraping()
    }, {
        scheduled: true,
        timezone: "America/Bogota"
    });
})