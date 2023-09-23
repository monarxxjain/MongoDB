const mongoose = require('mongoose');
const chatQuerySchema = new mongoose.Schema({
    queryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If queryID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    sessionID: String,
    queryText: String,
    queryDateTime: {
        type: Date,
        default: Date.now,
    },
    responseText: String,
    responseDateTime: Date,
    responseStatus: {
        type: String,
        enum: ['Successful', 'Failed', 'Pending'],
    },
    responseTime: Number,
    sourcePlatform: {
        type: String,
        enum: ['Web', 'Mobile', 'API'],
    },
    queryContext: {
        type: mongoose.Schema.Types.Mixed, // Can store JSON or Text
    },
    responseError: String,
    queryLanguage: String,
    responseLanguage: String,
    tags: [String], // Array of tags
    userFeedback: String,
    userRating: Number,
    followUpAction: String,
    followUpStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
    },
    associatedTicketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportTicket', // Reference to the Ticket model
    },
    notes: String,
});

module.exports = mongoose.model('ChatQuery', chatQuerySchema);
