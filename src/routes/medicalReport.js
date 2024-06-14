const express = require('express');
const router = express.Router();
const { addMedicalReport, getAllMedicalReports, deleteMedicalReportById } = require('../controllers/medicalReport');
const { upload } = require('../controllers/upload');
const authMiddleware = require('../middlewares/authMiddleware');



// Add new medical report
router.post('/', upload.single('file'), addMedicalReport); // 'file' is the name of the field in the form

// Get all medical reports
router.get('/', authMiddleware, getAllMedicalReports); 

// Delete medical report
router.delete('/:id', authMiddleware, deleteMedicalReportById); 


// soft delete by user and admin
module.exports = router;