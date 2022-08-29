var express = require('express');
var router = express.Router();
const eventRouter = require('./events')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/events',eventRouter)

module.exports = router;