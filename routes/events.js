var express = require('express');
var router = express.Router();

const {
    all,
    create,
    read
} = require('../controllers/eventController')

router.get('/', all)
router.get('/:id', read)
router.post('/', create)

module.exports = router;