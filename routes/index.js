let express = require('express');
let router = express.Router();
let eventRouter = require('./events')
let authRouter = require('./auth')
let commentRouter = require('./comments')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/events', eventRouter)
router.use('/auth', authRouter)
router.use('/comments', commentRouter)

module.exports = router;