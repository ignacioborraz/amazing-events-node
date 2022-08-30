var express = require('express');
var router = express.Router();

const {
    create,
    read
} = require('../controllers/eventController')

router.get('/:id', read)
router.post('/', create)

module.exports = router;