const mongoose = require('mongoose');

const shiftScheduleSchema = new mongoose.Schema({
    shiftID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If shiftID should be unique
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
    shiftType: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'Other'],
        required: true,
    },
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Roles model (optional)
    },
    locationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Reference to Warehouse Locations or Office Locations model (optional)
    },
    shiftStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Other'],
        required: true,
    },
    breakStartTime: Date, // Optional
    breakEndTime: Date, // Optional
    totalHours: {
        type: Number,
        required: true,
    },
    overtimeHours: {
        type: Number,
        default: 0,
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    swapRequestStatus: {
        type: String,
        enum: ['Requested', 'Approved', 'Denied', 'NotRequested', 'Other'],
    },
    requestedSwapWithEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model (optional)
    },
    swapApprovalByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    notes: String, // Optional
});

module.exports = mongoose.model('ShiftSchedule', shiftScheduleSchema);