const mongoose = require('mongoose');

const partnershipSchema = new mongoose.Schema({
    partnershipID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If partnershipID should be unique
    },
    partnerName: String,
    partnershipType: {
        type: String,
        enum: ['Affiliate', 'Distributor', 'Collaborator', 'Other'], // Add more types as needed
    },
    startDate: Date,
    endDate: Date, // Optional
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Terminated', 'Other'], // Add more statuses as needed
    },
    contractID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract', // Reference to the Contracts model
    },
    primaryContactName: String,
    primaryContactEmail: String,
    primaryContactPhone: String,
    revenueShare: Number,
    annualReviewDate: Date,
    logoURL: String, // Optional
    websiteURL: String, // Optional
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    partnershipBenefits: String, // Optional
    partnershipObjectives: String,
    performanceMetrics: String, // Optional
    renewalTerms: String, // Optional
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    modifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    modifiedDate: Date, // Optional
    notes: String, // Optional
});

module.exports = mongoose.model('Partnership', partnershipSchema);