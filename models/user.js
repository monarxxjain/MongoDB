const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If UserID should be unique
    },
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    middleName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    alternateEmail: String,
    phone: String,
    alternatePhone: String,
    dateOfBirth: Date,
    profilePictureURL: String,
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Assuming you have a "Roles" model
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    lastLoginDate: Date,
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: Boolean,
    twoFactorAuthEnabled: Boolean,
    twoFactorAuthKey: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    address: String,
    address2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    languagePreference: {
        type: String, // Or use an enum if you have specific language options
    },
    timeZone: {
        type: String, // Or use an enum if you have specific time zone options
    },
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    accountLockoutUntil: Date,
    securityQuestion1: String,
    securityAnswer1: String,
    securityQuestion2: String,
    securityAnswer2: String,
    referralSource: String,
    notes: String,
});

module.exports = mongoose.model('User', userSchema);
