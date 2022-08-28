var express = require('express');
var router = express.Router();

/* GET home page. */
// req = request, peticion del cliente, solo de lectura
// res = response, mensaje que envia el servidor
router.get('/', function(req, res, next) {
    res.json([])
});

// http://localhost:3001/123
// Parametro de la URL
router.get('/:id', function(req, res, next) {
  if ( req.params.id == 123 ) {
    res.status(404).json()
    return
  }

  res.json({
    id : req.params.id
  })
})

module.exports = router;
