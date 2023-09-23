const mongoose = require('mongoose');

const clientsFeedbackSchema = new mongoose.Schema({
    feedbackId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If feedbackId should be unique
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client model
    },
    feedbackDate: {
        type: Date,
        default: Date.now,
    },
    feedbackChannel: {
        type: String,
        enum: ['Email', 'Phone', 'Website', 'In-Person', 'Other'],
    },
    feedbackCategory: {
        type: String,
        enum: ['Compliment', 'Complaint', 'Suggestion', 'Query', 'Other'],
    },
    feedbackSubject: String,
    feedbackDetail: String,
    feedbackStatus: {
        type: String,
        enum: ['New', 'In Review', 'Addressed', 'Resolved', 'Closed'],
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    resolutionDate: Date,
    resolutionDetail: String,
    clientFollowUpDate: Date,
    clientFollowUpNotes: String,
    feedbackImpact: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    relatedOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    relatedProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    attachments: [String], // Array of attachment URLs
    feedbackRating: {
        type: String,
        enum: ['1-5', '1-10', 'Other'], // You can adjust this enum as needed
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('ClientsFeedback', clientsFeedbackSchema);