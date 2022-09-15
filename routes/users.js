var express = require('express')
var router = express.Router()

const {
    all,
    create,
    read,
    update,
    destroy
} = require('../controllers/userController')

router.get('/', all)
router.get('/:id', read)
router.post('/', create)
router.patch('/:id',update)
router.delete('/:id',destroy)

module.exports = router
