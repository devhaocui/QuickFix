// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.get('/users', userController.getAllUsers);
router.post('/users/login', userController.loginUser)
// router.post('/users', userController.createUser);

module.exports = router;
