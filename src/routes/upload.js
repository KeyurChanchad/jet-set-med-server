const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadMedicalReport } = require('../controllers/upload');

// Upload medical report
router.post('/', authMiddleware, uploadMedicalReport);


// soft delete by user and admin
module.exports = router;