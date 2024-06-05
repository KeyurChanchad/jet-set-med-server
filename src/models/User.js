// User model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenth: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenth: 2,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    profilePhoto: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);