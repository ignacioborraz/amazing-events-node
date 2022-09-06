var express = require('express');
var router = express.Router();

const eventRouter = require('./events')
const userRouter = require('./users')
const commentRouter = require('./comments')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/events', eventRouter)
router.use('/users', userRouter)
router.use('/comments', commentRouter)

module.exports = router;
