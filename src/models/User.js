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
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profilePhoto: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);