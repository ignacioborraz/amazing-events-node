var express = require('express');
var router = express.Router();
let passport = require('../config/passport')
let {accountExists, accountHasBeenVerified} = require('../middlewares/auth')

const {
    signUp,
    verifyMail,
    signIn,
    signInWithToken,
    signOut
} = require('../controllers/authController')

router.post('/signup', signUp);
router.get('/verify/:code', verifyMail);
router.post('/signin', accountExists, accountHasBeenVerified, signIn);
router.get('/token', passport.authenticate('jwt', {session:false}), signInWithToken);
router.post('/signout', passport.authenticate('jwt', {session:false}), signOut);

module.exports = router;
