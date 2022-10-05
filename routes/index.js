let express = require('express');
let router = express.Router();

const authRouter = require('./auth')
const commentsRouter = require('./comments')
const eventsRouter = require('./events')
const categoriesRouter = require('./categories')
const likesRouter = require('./likes')
const mh = require('./mh')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/auth',authRouter)
router.use('/comments', commentsRouter)
router.use('/events', eventsRouter)
router.use('/categories', categoriesRouter)
router.use('/likes', likesRouter)
router.use('/event', mh)

module.exports = router;