const express = require('express');
const { crearMesa, leerMesa, actualizarMesa, borrarMesa } = require('../controllers/mesaController');
const { validateTable } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear una nueva mesa
router.post('/', protect, validateTable, crearMesa);

// Ruta para leer una mesa específica por ID
router.get('/:id', protect, leerMesa);

// Ruta para actualizar una mesa específica por ID
router.put('/:id', protect, validateTable, actualizarMesa);

// Ruta para borrar una mesa específica por ID
router.delete('/:id', protect, borrarMesa);

module.exports = router;
