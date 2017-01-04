var express = require('express'),
    router = express.Router(),
    app = express()
bodyParser = require('body-parser') // Parse incoming request bodies in a middleware before handle

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var routers = require('./routers')

app.use('/', routers)

module.exports = app