const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

// Sólo los administradores pueden gestionar roles y permisos
router.get('/manage-roles', authenticateToken, authorizeRoles(1), (req, res) => {
  // Implementación de gestión de roles
});

router.get('/manage-permissions', authenticateToken, authorizeRoles(1), (req, res) => {
  // Implementación de gestión de permisos
});

module.exports = router;
