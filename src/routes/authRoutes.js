const express = require('express');
const router = express.Router();
const { registerUser, loginUser, resetPassword, setNewPassword } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.post('/set-new-password', setNewPassword);

module.exports = router;
