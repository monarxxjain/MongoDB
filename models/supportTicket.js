const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    ticketID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ticketID should be unique
    },
    subject: String,
    description: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed', 'Reopened'],
    },
    assignedToUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    category: String, // You can create a separate "Category" model and use a reference if needed
    openDate: {
        type: Date,
        default: Date.now,
    },
    closeDate: Date, // Optional
    expectedResolutionDate: Date, // Optional
    actualResolutionDate: Date, // Optional
    resolution: String, // Optional
    relatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Products model (optional)
    },
    attachments: [String], // An array of file URLs or paths
    feedback: String, // Optional
    feedbackComments: String, // Optional
    followUpRequired: Boolean,
    followUpDate: Date, // Optional
    lastUpdatedDate: {
        type: Date,
        default: Date.now,
    },
    lastUpdatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    internalNotes: String, // Optional
    origin: {
        type: String,
        enum: ['Email', 'Web', 'Phone', 'Chat', 'Other'], // Add more origin types as needed
    },
    relatedOrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Orders model (optional)
    },
    escalationLevel: Number, // Optional
    timeToFirstResponse: String, // Optional (can be Time or Duration)
    timeToResolution: String, // Optional (can be Time or Duration)
    notes: String, // Optional
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);