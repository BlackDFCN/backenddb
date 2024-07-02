const express = require('express');
const { crearRol, leerRol, actualizarRol, borrarRol } = require('../controllers/roleController');
const router = express.Router();

router.post('/', crearRol);
router.get('/:id', leerRol);
router.put('/:id', actualizarRol);
router.delete('/:id', borrarRol);

module.exports = router;
