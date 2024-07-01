const express = require('express');
const { crearMesa, leerMesa, actualizarMesa, borrarMesa } = require('../controllers/tableController');
const { validateTable } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, validateTable, crearMesa);
router.get('/:id', protect, leerMesa);
router.put('/:id', protect, validateTable, actualizarMesa);
router.delete('/:id', protect, borrarMesa);

module.exports = router;
