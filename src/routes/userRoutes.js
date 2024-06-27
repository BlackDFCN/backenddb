const express = require('express');
const { registerUser, loginUser, resetPassword, setNewPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.post('/set-new-password', setNewPassword);

module.exports = router;
