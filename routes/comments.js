var express = require('express')
var router = express.Router()
let passport = require('../config/passport')

const {
    all,
    create,
    read,
    update,
    destroy
} = require('../controllers/commentController')

router.get('/', all)
router.get('/:id', read)
router.post('/', passport.authenticate('jwt', {session:false}), create)
router.patch('/:id', passport.authenticate('jwt', {session:false}), update)
router.delete('/:id', passport.authenticate('jwt', {session:false}), destroy)

module.exports = router