// server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();
// Define Port
const PORT = process.env.PORT || 5000;

// Init  Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Connect Database
connectDB();

// Set static folder for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// Authentication endpoint
app.use('/api/v1/auth', require('./src/routes/auth'));
// User endpoint
app.use('/api/v1/user', require('./src/routes/user'));
// Doctor endpoint
app.use('/api/v1/doctors', require('./src/routes/doctor'));
// Service endpoint
app.use('/api/v1/services', require('./src/routes/service'));
// Appointment endpoint
app.use('/api/v1/appointments', require('./src/routes/appointment'));
// Payment endpoint
app.use('/api/v1/payments', require('./src/routes/payment'));
// Medical Report endpoint
app.use('/api/v1/medicalReports', require('./src/routes/medicalReport'));
// CallBackRequest endpoint
app.use('/api/v1/callBackRequests', require('./src/routes/callBackRequest'));


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
