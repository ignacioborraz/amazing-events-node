var express = require('express');
var router = express.Router();
const {signUp,verifyMail} = require('../controllers/userController')

/* GET users listing. */
router.post('/signup',signUp);
router.get('/verify/:code',verifyMail)

module.exports = router;
