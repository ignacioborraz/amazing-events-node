let express = require('express');
let router = express.Router();

const authRouter = require('./auth')
const commentsRouter = require('./comments')
const eventsRouter = require('./events')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/auth',authRouter)
router.use('/comments', commentsRouter)
router.use('/events', eventsRouter)

module.exports = router;