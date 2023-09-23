const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    reportID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If reportID should be unique
    },
    reportName: String,
    reportDescription: String,
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    createdDateTime: {
        type: Date,
        default: Date.now,
    },
    modifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    modifiedDateTime: Date,
    reportType: {
        type: String,
        enum: ['Sales', 'Inventory', 'Marketing', 'Performance', 'Other'],
    },
    reportStatus: {
        type: String,
        enum: ['Draft', 'Finalized', 'Archived'],
    },
    reportPeriodStart: Date,
    reportPeriodEnd: Date,
    dataSources: [String], // Array of data sources
    fileLink: String,
    visibility: {
        type: String,
        enum: ['Public', 'Private', 'Restricted'],
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    approvedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    approvalDateTime: Date,
    reportTags: [String], // Array of report tags
    associatedProjectID: String, //! or Reference to the Project model (DO NOT EXIST)
    notes: String,
});

module.exports = mongoose.model('Report', reportSchema);