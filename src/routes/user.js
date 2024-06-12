const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { updateUser } = require('../controllers/user');

// Edit user profile
router.put('/', authMiddleware, updateUser);


// soft delete by user and admin
module.exports = router;