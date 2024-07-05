const express = require('express');
const { obtenerMesas, crearMesa, leerMesa, actualizarMesa, borrarMesa } = require('../controllers/tableController');
const { validateTable } = require('../middleware/validators');
const { authUser, authRole } = require('../middleware/auth');
const router = express.Router();

// Ruta para obtener todas las mesas
router.get('/', authUser, obtenerMesas);

// Ruta para crear una nueva mesa
router.post('/', authUser, authRole(1), validateTable, crearMesa); // Solo administradores

// Ruta para leer una mesa específica por ID
router.get('/:id', authUser, leerMesa);

// Ruta para actualizar una mesa específica por ID
router.put('/:id', authUser, authRole(1), validateTable, actualizarMesa); // Solo administradores

// Ruta para borrar una mesa específica por ID
router.delete('/:id', authUser, authRole(1), borrarMesa); // Solo administradores

module.exports = router;
