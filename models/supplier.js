const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If supplierId should be unique
    },
    supplierName: String,
    contactFirstName: String,
    contactLastName: String,
    contactTitle: String,
    email: String,
    phoneNumber: String,
    alternativePhoneNumber: String,
    faxNumber: String,
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    website: String,
    supplierType: {
        type: String,
        enum: ['Goods', 'Services', 'Both'],
    },
    supplierStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    lastOrderDate: Date,
    paymentTerms: String,
    bankDetails: String,
    taxId: String,
    preferredCommunicationMethod: {
        type: String,
        enum: ['Email', 'Phone', 'Fax', 'Postal'],
    },
    contractStartDate: Date,
    contractEndDate: Date,
    attachmentLinks: [String], // Array of attachment URLs
    assignedAccountManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('Supplier', supplierSchema);