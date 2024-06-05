const express = require('express');
const { signup, login, forgotPassword } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
// router.post('/resetPassword', resetPassword);
// router.post('/updateEmail', updateEmail);

module.exports = router;
