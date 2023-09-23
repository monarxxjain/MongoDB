const mongoose =require('mongoose');

const vacationRequestSchema = new mongoose.Schema({
    requestID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If requestID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalDaysRequested: {
        type: Number,
        required: true,
    },
    requestDate: {
        type: Date,
        required: true,
    },
    requestStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied', 'Cancelled', 'Other'],
        required: true,
    },
    reasonForVacation: String, // Optional
    managerNotes: String, // Optional
    approvedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    approvalDate: Date, // Optional
    isPaidLeave: Boolean,
    vacationType: {
        type: String,
        enum: ['Annual Leave', 'Sick Leave', 'Personal Day', 'Maternity/Paternity', 'Other'],
    },
    attachedDocuments: String, // File or URL (optional)
    emergencyContactName: String, // Optional
    emergencyContactNumber: String, // Optional
    requestedCoverageEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model (optional)
    },
    coverageStatus: {
        type: String,
        enum: ['NotNeeded', 'Requested', 'Approved', 'Denied', 'Other'],
    },
    returnDate: Date,
    actualReturnDate: Date, // Optional
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    notes: String, // Optional
});

module.exports = mongoose.model('VacationRequest', vacationRequestSchema);