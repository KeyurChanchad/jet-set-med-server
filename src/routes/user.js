const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addUser, updateUser } = require('../controllers/user');

// Add new user
router.post('/', authMiddleware, addUser);

// Edit user profile
router.put('/', authMiddleware, updateUser);


// soft delete by user and admin
module.exports = router;