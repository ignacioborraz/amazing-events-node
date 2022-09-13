var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Amazing Events' });
});

router.use('/events', eventRouter)
router.use('/auth',authRouter)
router.use('/comments', commentRouter)

module.exports = router;