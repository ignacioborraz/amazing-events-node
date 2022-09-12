var express = require('express');
var router = express.Router();
const {signUp} = require('../controllers/userController')

/* GET users listing. */
router.post('/signup',signUp);

module.exports = router;
