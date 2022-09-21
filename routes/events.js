var express = require('express')
var router = express.Router()
let passport = require('../config/passport')

const {
    all,
    create,
    read,
    update,
    destroy,
    like
} = require('../controllers/eventController')

router.get('/', all)
router.get('/:id', read)
router.post('/', passport.authenticate('jwt', {session:false}), create)
router.patch('/:id', update)
router.delete('/:id', destroy)
router.patch('/like/:id', passport.authenticate('jwt', {session:false}), like)

module.exports = router