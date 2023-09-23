const mongoose = require('mongoose');

const hrPolicySchema = new mongoose.Schema({
    policyID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If policyID should be unique
    },
    policyTitle: {
        type: String,
        required: true,
    },
    policyCategory: {
        type: String,
        enum: ['Attendance', 'Benefits', 'Conduct', 'Equal Opportunity', 'Other'],
        required: true,
    },
    policyVersion: {
        type: String,
        required: true,
    },
    effectiveDate: {
        type: Date,
        required: true,
    },
    endDate: Date, // Optional
    policySummary: String,
    policyDetail: String, // Text or LongText
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
    approvalStatus: {
        type: String,
        enum: ['Draft', 'Pending', 'Approved', 'Archived', 'Other'],
        required: true,
    },
    approvedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    approvalDate: Date, // Optional
    relatedDocuments: String, // File or URL (optional)
    associatedDepartment: String, // Optional
    revisionNotes: String, // Optional
    feedbackChannel: String, // Text or URL (optional)
    reviewFrequency: {
        type: String,
        enum: ['Annually', 'Bi-Annually', 'Quarterly', 'Other'],
    },
    nextReviewDate: Date, // Optional
    policyAcknowledgedBy: String, // Text (optional)
    notes: String, // Optional
});

module.exports = mongoose.model('HrPolicy', hrPolicySchema);