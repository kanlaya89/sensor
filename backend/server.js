var app = require('./app'),
    http = require('http'),
    mqtt_client = require('./mqtt_client')


var server = http.createServer(app)
server.listen(3001, function(){
    console.log("Running SERVER on port 3001")
})