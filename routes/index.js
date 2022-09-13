var express = require('express');
var router = express.Router();

const eventRouter = require('./events')
<<<<<<< HEAD
const authRouter = require('./auth')
=======
const userRouter = require('./users')
const commentRouter = require('./comments')
>>>>>>> 002d1d4887cfcc7c1f6f0646c02604c69811446d

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/events', eventRouter)
<<<<<<< HEAD
router.use('/auth',authRouter)
=======
router.use('/users', userRouter)
router.use('/comments', commentRouter)
>>>>>>> 002d1d4887cfcc7c1f6f0646c02604c69811446d

module.exports = router;
