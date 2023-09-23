const mongoose = require('mongoose');

const billingInvoiceSchema = new mongoose.Schema({
    invoiceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If invoiceID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    invoiceNumber: String,
    invoiceDate: {
        type: Date,
        required: true,
    },
    dueDate: Date,
    billingAddress: String,
    shippingAddress: String,
    totalAmount: Number,
    taxAmount: Number,
    discountAmount: Number,
    subTotal: Number,
    currency: String,
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partial', 'Overdue'],
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Other'],
    },
    invoiceNotes: String,
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    invoiceItems: {
        type: mongoose.Schema.Types.Mixed, // Can store JSON or reference to InvoiceItems table
    },
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    termsAndConditions: String,
    penaltyRate: Number,
    paidDate: Date,
    paymentReference: String,
    bankDetails: String,
    notes: String,
});

module.exports = mongoose.model('BillingInvoice', billingInvoiceSchema);