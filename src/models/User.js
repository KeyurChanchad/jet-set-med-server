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
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isQNACompleted: { // login not require
        type: Boolean,
        default: false,
    },
    isConsultant: { // first login then qna
        type: Boolean,
        default: false,
    },
    isSubscribe: { // first login, qna completed, isconsultant take
        type: Boolean,
        default: false,
    },
    previousAppointments: {
        type: [ObjectID],
    },
    upcomingAppointments: {
        type: [ObjectID],
    },
    type: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field before each save
// userSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
//   });

module.exports = mongoose.model('User', userSchema);