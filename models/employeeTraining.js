const mongoose = require('mongoose');

const employeeTrainingSchema = new mongoose.Schema({
    trainingID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If TrainingID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    trainingName: String,
    trainingType: {
        type: String,
        enum: ['Onboarding', 'Skills Development', 'Safety', 'Compliance', 'Software', 'Workshop'],
    },
    trainingProvider: String,
    trainingDescription: String,
    startDate: Date,
    endDate: Date,
    duration: Number,
    location: String,
    instructorName: String,
    trainingMaterials: String, // Or use JSON if it's a structured object
    trainingCost: Number,
    certificationReceived: Boolean,
    certificationName: String,
    certificationExpiryDate: Date,
    performanceScore: {
        type: mongoose.Schema.Types.Mixed, // Can be Decimal or String, use Mixed type
    },
    trainingStatus: {
        type: String,
        enum: ['Completed', 'Ongoing', 'Scheduled', 'Cancelled'],
    },
    attachments: String, // Or use JSON if it's a structured object
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
    feedbackLink: String,
    followUpDate: Date,
    notes: String,
});

module.exports = mongoose.model('EmployeeTraining', employeeTrainingSchema);