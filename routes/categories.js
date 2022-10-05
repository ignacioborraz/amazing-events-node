var express = require('express')
var router = express.Router()

const {
    create,
    all,    
    one,
    update,
    destroy
} = require('../controllers/categoryController')

router.post('/', create)
router.get('/', all)
router.get('/:id', one)
router.patch('/:id', update)
router.delete('/:id', destroy)

module.exports = router