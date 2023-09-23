const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    refundID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If refundID should be unique
    },
    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment', // Reference to the Payment model
    },
    invoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingInvoice', // Reference to the BillingInvoice model
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    refundDate: {
        type: Date,
        required: true,
    },
    refundAmount: Number,
    currency: String,
    refundMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Original Payment Method', 'Other'],
    },
    refundReference: String,
    refundStatus: {
        type: String,
        enum: ['Completed', 'Failed', 'Pending'],
    },
    refundReason: String,
    bankName: String, // Optional
    cardType: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex', 'Other'], // Optional
    },
    cardLastFourDigits: String, // Optional
    paymentGateway: String,
    gatewayTransactionID: String,
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    originalPaymentDate: Date,
    notes: String,
});

module.exports = mongoose.model('Refund', refundSchema);

