var express = require('express');
var router = express.Router();
let passport = require('../config/passport')

const {
    signUp,
    verifyMail,
    signIn,
    signInToken,
    signOut
} = require('../controllers/userController')

router.post('/signup', signUp);
router.get('/verify/:code', verifyMail);
router.post('/signin', signIn);
router.get('/token', passport.authenticate('jwt', {session:false}), signInToken);
router.post('/signout', passport.authenticate('jwt', {session:false}), signOut);

module.exports = router;