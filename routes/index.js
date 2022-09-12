var express = require('express');
var router = express.Router();

const eventRouter = require('./events')
const authRouter = require('./auth')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/events', eventRouter)
router.use('/auth',authRouter)

module.exports = router;
