const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addUser } = require('../controllers/user');

router.post('/', authMiddleware, addUser);

module.exports = router;