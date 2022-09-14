let express = require('express');
let router = express.Router();

const authRouter = require('./auth')
const commentsRouter = require('./comments')
const eventsRouter = require('./events')
const usersRouter = require('./users')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/auth',authRouter)
router.use('/comments', commentsRouter)
router.use('/events', eventsRouter)
router.use('/users', usersRouter)

module.exports = router;