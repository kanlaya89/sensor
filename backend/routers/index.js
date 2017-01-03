var router = require('express').Router()

router.get('/', function(req, res){
    res.send('app works!!!')
})

module.exports = router