const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If paymentID should be unique
    },
    invoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingInvoice', // Reference to the BillingInvoice model
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentAmount: Number,
    currency: String,
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Other'],
    },
    paymentReference: String,
    paymentStatus: {
        type: String,
        enum: ['Completed', 'Failed', 'Pending', 'Refunded'],
    },
    paymentNotes: String,
    bankName: String,
    cardType: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex', 'Other'],
    },
    cardLastFourDigits: String,
    paymentGateway: String,
    gatewayTransactionID: String,
    isRecurring: Boolean,
    nextPaymentDate: Date,
    paymentFrequency: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Yearly', 'Other'],
    },
    failureReason: String,
    refundAmount: Number,
    refundDate: Date,
    refundReason: String,
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    notes: String,
});

module.exports = mongoose.model('Payment', paymentSchema);