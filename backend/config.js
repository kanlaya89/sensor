 const os = require('os'),
     dns = require('dns')
 var dbConnect = require('./database').start

 var hostname = os.hostname()

 exports.exp1 = function(db, callback) {
     console.log('configs')
     var test = function() {
         db.collection('rooms').find({ hostname: hostname }).toArray(function(err, result) {
             if (err) {
                 console.log('ERR: ' + err)
                 return callback(err, null)
             }
             if (result[0]) {
                 console.log("result" + result[0])
                 console.log(hostname + ' already exists')
                 return callback(null, result[0])
             } else {
                 this.isSavedHostname = false
                 console.log(hostname + ' does not exist')
                 return callback(null, null)
             }
         })
     }
     config = {
         start: test(),
     }
 }

 exports.exp2 = {
     Broker: {
         ip: "10.10.1.44",
         port: '8080'
     }
 }