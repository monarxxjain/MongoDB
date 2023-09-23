const mongoose = require('mongoose');

const employeePerformanceSchema = new mongoose.Schema({
    performanceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PerformanceID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    reviewPeriodStart: Date,
    reviewPeriodEnd: Date,
    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model for the Reviewer
    },
    jobRoleExpectation: String,
    tasksCompleted: String, // Or use JSON if it's a structured object
    taskPerformanceRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    skillsetEvaluation: String, // Or use JSON if it's a structured object
    skillsetRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    behavioralEvaluation: String, // Or use JSON if it's a structured object
    behavioralRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    achievements: String,
    areasOfImprovement: String,
    trainingRecommendations: String,
    goalsForNextPeriod: String,
    overallRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    promotionRecommendation: Boolean,
    raiseRecommendation: Number,
    commentsByReviewer: String,
    commentsByEmployee: String,
    nextReviewDate: Date,
    reviewStatus: {
        type: String,
        enum: ['Draft', 'Completed', 'Acknowledged by Employee'],
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    attachments: String, // Or use JSON if it's a structured object
    acknowledgedByEmployee: Boolean,
    acknowledgmentDate: Date,
    confidentialNotes: String,
    notes: String,
});

module.exports= mongoose.model('EmployeePerformance', employeePerformanceSchema);