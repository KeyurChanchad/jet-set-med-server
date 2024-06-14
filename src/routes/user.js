const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { updateUser, deleteUser } = require('../controllers/user');

// Edit user profile
router.put('/', authMiddleware, updateUser);

// Delete user
router.delete('/', authMiddleware, deleteUser);


// soft delete by user and admin
module.exports = router;