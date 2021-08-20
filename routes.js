const express = require('express');
const router = express.Router();
const connection = require('./database/db');




const crud = require('./controller/crudClientes')
const crudPar = require('./controller/crudParqueadero')
const crudPropietarios = require('./controller/crudPropietario')
const crudParqueados = require('./controller/crudParqueados')
router.post('/savePropietario', crudPropietarios.savePropietario)
router.post('/saveparqueadero', crudPar.saveParqueadero)
router.post('/calcular', crudParqueados.calcular)
router.post('/save', crud.save)
module.exports = router;