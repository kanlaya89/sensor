var router = require('express').Router()
    // dbConnect = require('../database').start
const os = require('os'),
    dns = require('dns')

var hostname = os.hostname()
var myIP = ''
var getIP = function() {
    dns.lookup(os.hostname(), function(err, result) {
        myIP = result
    })
}
getIP()

router.get('/', function(req, res) {
    res.send('app works!!!')
})

router.get('/isRegisteredHostname', function(req, res) {
    this.db.collection('rooms').find({ hostname: hostname }).toArray(function(err, result) {
        if (err) { return res.send(err) }
        if (result[0]) {
            console.log(hostname + ' already exists')
            res.send(result[0])
        } else {
            console.log(hostname + ' does not exist')
            res.send({ NONE: "Not exist" })
        }
    })
})

router.post('/register', function(req, res) {
    var data = {
        room: req.body.room,
        node: req.body.node
    }
    var response = {}
        // checking ROOM if it exists or not
    this.db.collection('rooms').findOne({ roomNumber: data.room }, function(err, result) {
        if (err) { return res.send(err) }
        if (result) {
            response.room = data.room
            console.log('ROOM:' + data.room + ' already exists')
            checkNode()
        } else {
            // insert ROOM into collection
            this.db.collection('rooms').insert({ roomNumber: data.room, path: null }, function(err, done) {
                if (err) { return res.send(err) }
                response.room = data.room
                console.log('SAVED room:' + data.room)
                checkNode()
            })
        }
    })

    // checking NODE if it exists or not
    var checkNode = function() {
        this.db.collection('rooms').findOne({ nodeName: data.node, path: data.room }, function(err, result) {
            if (err) { return res.send(err) }
            if (result) {
                response.node = data.node
                console.log('NODE:' + data.node + ' already exists in ROOM:' + data.room)
                response.status = false
                return res.send(response)
            } else {
                // insert NODE into collection
                this.db.collection('rooms').insert({ nodeName: data.node, path: data.room, hostname: hostname }, function(err, result) {
                    if (err) { return res.send(err) }
                    response.node = data.node
                    response.status = true
                    console.log('SAVED node:' + data.node)
                    return res.send(response)
                })
            }
        })
    }
})

module.exports = router