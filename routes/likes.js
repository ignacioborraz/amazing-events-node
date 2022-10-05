var express = require('express')
var router = express.Router()
let passport = require('../config/passport')

const {
    all,
    create
} = require('../controllers/likeController')

router.post('/:event', passport.authenticate('jwt', {session:false}), create)
router.get('/', all)

module.exports = router