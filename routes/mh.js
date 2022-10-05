var express = require('express')
var router = express.Router()
let passport = require('../config/passport')

const {
    create,
    one,
    all,
    update,
    destroy
} = require('../controllers/mhController')

router.post('/',create)
router.get('/',all)
router.get('/:id',one)
router.patch('/:id',update)
router.delete('/:id',destroy)

module.exports = router