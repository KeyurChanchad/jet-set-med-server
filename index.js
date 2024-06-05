// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURL } = require('./constants')
const app = express();
// Define port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(`${mongoURL}/jetSetMed`, { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
// Authentication endpoint
// app.use('/api/auth', require('./src/routes/auth'));
// User endpoint
app.use('/api/v1/user', require('./src/routes/user'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
