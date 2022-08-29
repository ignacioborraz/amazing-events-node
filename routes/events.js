var express = require('express');
var router = express.Router();

//traerme el método con desestructuracion
const {create,read} = require('../controllers/eventController') //acá me traigo una propiedad/metodo del objeto/controlador

//traerme el método con el objeto entero
/* 
const eventsController = require('../controllers/eventController') //aca me traigo TODO el objeto/controlador
const createController = eventsController.create
const readController = eventsController.read
const updateController = eventsController.update
const destroyController = eventsController.destroy
 */

//router.metodo('la ruta',controlador)
router.post('/',create)
router.get('/:id',read)

//localhost8000/events/

module.exports = router;