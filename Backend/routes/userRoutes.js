const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import user controller

// Register a new user
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;