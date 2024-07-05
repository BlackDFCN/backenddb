const express = require('express');
const { crearRol, leerRol, actualizarRol, borrarRol } = require('../controllers/roleController');
const { validateRole } = require('../middleware/validators');
const { authUser } = require('../middleware/auth');
const router = express.Router();

// Ruta para crear un nuevo rol
router.post('/', authUser, validateRole, crearRol);

// Ruta para leer un rol por ID
router.get('/:id', authUser, leerRol);

// Ruta para actualizar un rol por ID
router.put('/:id', authUser, validateRole, actualizarRol);

// Ruta para borrar un rol por ID
router.delete('/:id', authUser, borrarRol);

module.exports = router;
