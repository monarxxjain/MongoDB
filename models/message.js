const mongoose  = require('mongoose');


const messageSchema = new mongoose.Schema({
    messageID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If messageID should be unique
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    recipientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    subject: String,
    messageBody: String,
    sentDateTime: {
        type: Date,
        default: Date.now,
    },
    readDateTime: Date,
    attachmentLinks: [String], // Array of attachment URLs
    threadID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    messageType: {
        type: String,
        enum: ['Direct', 'System Notification', 'Group', 'Other'],
    },
    priority: {
        type: String,
        enum: ['Normal', 'High', 'Urgent'],
    },
    status: {
        type: String,
        enum: ['Unread', 'Read', 'Archived', 'Deleted'],
    },
    replyToMessageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Reference to the Message model
    },
    isStarred: Boolean,
    labels: [String], // Array of label names
    recipientGroupID: String, //! Reference to the RecipientGroup model (DO NOT EXIST)
    deletedBySender: Boolean,
    deletedByRecipient: Boolean,
    notes: String,
});

module.exports = mongoose.model('Message', messageSchema);