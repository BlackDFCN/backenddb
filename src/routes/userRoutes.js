const express = require('express');
const { crearUsuario, leerUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/userController');
const { validateUser } = require('../middleware/validators');
const { authUser } = require('../middleware/auth');
const router = express.Router();

router.post('/', validateUser, crearUsuario);
router.get('/:id', authUser, leerUsuario);
router.put('/:id', authUser, validateUser, actualizarUsuario);
router.delete('/:id', authUser, borrarUsuario);

module.exports = router;
