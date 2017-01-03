var express = require('express'),
    router = express.Router(),
    app = express()
    bodyParser = require('body-parser') // Parse incoming request bodies in a middleware before handle

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

var routers = require('./routers')

app.use('/', routers)

module.exports = app
