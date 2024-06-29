const express = require('express');
const router = express.Router();
const { createTable, getTables, updateTable, deleteTable } = require('../controllers/tableController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.post('/', authenticateToken, authorizeRoles(1, 2), createTable); // Administradores y trabajadores
router.get('/', authenticateToken, getTables); // Todos los roles
router.put('/:id', authenticateToken, authorizeRoles(1, 2), updateTable); // Administradores y trabajadores
router.delete('/:id', authenticateToken, authorizeRoles(1), deleteTable); // Solo administradores

module.exports = router;
