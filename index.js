// server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
// Define Port
const PORT = process.env.PORT || 5000;

// Init  Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Connect Database
connectDB();

// Routes
// Authentication endpoint
app.use('/api/v1/auth', require('./src/routes/auth'));
// User endpoint
app.use('/api/v1/user', require('./src/routes/user'));
// Doctor endpoint
app.use('/api/v1/doctors', require('./src/routes/doctor'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
