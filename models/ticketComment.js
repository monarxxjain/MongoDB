const mongoose = require('mongoose');

const ticketCommentSchema = new mongoose.Schema({
    commentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If commentID should be unique
    },
    ticketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportTicket', // Reference to the SupportTicket model
        required: true,
    },
    commentText: String,
    commentedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    commentDate: {
        type: Date,
        default: Date.now,
    },
    attachment: [String], // Array of file URLs or paths (optional)
    commentType: {
        type: String,
        enum: ['User', 'Agent', 'System', 'Other'],
    },
    isInternal: Boolean,
    isEdited: Boolean,
    editedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    editDate: Date, // Optional
    relatedToAction: {
        type: String,
        enum: ['Status Change', 'Resolution Update', 'Escalation', 'Other'],
    },
    previousValue: String, // Optional
    newValue: String, // Optional
    commentMood: {
        type: String,
        enum: ['Neutral', 'Positive', 'Negative', 'Other'],
    },
    notes: String, // Optional
});

module.exports = mongoose.model('TicketComment', ticketCommentSchema);