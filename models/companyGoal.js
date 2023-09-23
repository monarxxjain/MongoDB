const mongoose = require('mongoose');

const companyGoalSchema = new mongoose.Schema({
    goalID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If goalID should be unique
    },
    goalTitle: {
        type: String,
        required: true,
    },
    goalDescription: String,
    startDate: {
        type: Date,
        required: true,
    },
    targetEndDate: {
        type: Date,
        required: true,
    },
    actualEndDate: Date, // Optional
    goalStatus: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Archived', 'Other'],
        required: true,
    },
    goalCategory: {
        type: String,
        enum: ['Financial', 'Operational', 'Strategic', 'HR', 'Marketing', 'Other'],
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    assignedToDepartment: String, // Optional
    assignedToUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    progressPercentage: Number,
    kpis: String, // Text (optional)
    dependencies: String, // Text (optional)
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
    resourcesAllocated: String, // Text (optional)
    milestones: String, // Text (optional)
    challenges: String, // Text (optional)
    attachments: String, // File or URL (optional)
    outcome: String, // Text (optional)
    feedback: String, // Text (optional)
    notes: String, // Text (optional)
});

module.exports = mongoose.model('CompanyGoal', companyGoalSchema);