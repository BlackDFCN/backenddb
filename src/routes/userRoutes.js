const express = require('express');
const { crearUsuario, leerUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/userController');
const { validateUser } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', validateUser, crearUsuario);
router.get('/:id', protect, leerUsuario);
router.put('/:id', protect, validateUser, actualizarUsuario);
router.delete('/:id', protect, borrarUsuario);

module.exports = router;
