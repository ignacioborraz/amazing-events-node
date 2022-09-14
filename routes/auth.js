var express = require('express');
var router = express.Router();
const {signUp,signIn,signOut,verifyMail} = require('../controllers/userController')

/* GET users listing. */
router.post('/signup',signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/verify/:code',verifyMail);

module.exports = router;