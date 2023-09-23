const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    contractID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If contractID should be unique
    },
    contractName: String,
    contractType: {
        type: String,
        enum: ['Supplier', 'Client', 'Employee', 'Other'],
    },
    relatedEntityID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    startDate: Date,
    endDate: Date,
    duration: Number,
    value: Number,
    paymentTerms: String,
    contractStatus: {
        type: String,
        enum: ['Active', 'Pending', 'Expired', 'Terminated', 'Draft'],
    },
    renewalStatus: {
        type: String,
        enum: ['Auto-renewal', 'Manual', 'Not Renewable'],
    },
    terminationConditions: String,
    specialClauses: String,
    documentLink: String,
    primaryContactID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    attachments: [String], // Array of attachment URLs
    reviewDate: Date,
    signatoryDetails: String,
    notes: String,
});

module.exports = mongoose.model('Contact', contactSchema);