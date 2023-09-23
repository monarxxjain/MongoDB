const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expenseID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If expenseID should be unique
    },
    dateIncurred: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: String,
    expenseCategory: {
        type: String,
        enum: ['Travel', 'Meals', 'Rent', 'Utilities', 'Other'], // Add more categories as needed
    },
    description: String,
    receipt: String, // You can store the file path or URL here
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Cheque', 'Other'],
    },
    vendor: String,
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model (optional)
    },
    isReimbursable: Boolean,
    reimbursementStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Reimbursed'],
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    approvedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    approvalDate: Date,
    taxAmount: Number,
    taxRate: Number,
    expenseAccount: String, // You can use a string or reference an Accounting model if needed
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

module.exports = mongoose.model('Expense', expenseSchema);