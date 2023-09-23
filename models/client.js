const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If clientId should be unique
    },
    clientName: String,
    clientType: {
        type: String,
        enum: ['Individual', 'Business'],
    },
    contactFirstName: String,
    contactLastName: String,
    email: String,
    phoneNumber: String,
    alternativePhoneNumber: String,
    faxNumber: String,
    shippingAddressId: String, //! or Reference to the ShippingAddress model (DO NOT EXIST)
    billingAddressId: String, //! Reference to the BillingAddress model (DO NOT EXIST)    
    clientStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    lastOrderDate: Date,
    totalLifetimeValue: Number,
    preferredPaymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    assignedSalesRepId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    taxId: String,
    website: String,
    industryType: String,
    creditLimit: Number,
    outstandingBalance: Number,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('Client', clientSchema);