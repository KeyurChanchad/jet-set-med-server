const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addMedicalReport } = require('../controllers/medicalReport');

// Add new medical report
router.post('/', authMiddleware, addMedicalReport);


// soft delete by user and admin
module.exports = router;