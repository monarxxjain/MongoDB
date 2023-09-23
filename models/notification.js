const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If notificationID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notificationType: {
        type: String,
        enum: ['System Alert', 'Reminder', 'Update', 'Task', 'Other'],
    },
    title: String,
    message: String,
    createdDateTime: {
        type: Date,
        default: Date.now,
    },
    readDateTime: Date,
    associatedLink: String,
    priority: {
        type: String,
        enum: ['Normal', 'High', 'Critical'],
    },
    status: {
        type: String,
        enum: ['Unread', 'Read', 'Archived', 'Dismissed'],
    },
    triggerEvent: String,
    expirationDateTime: Date,
    icon: String,
    actionButtons: String, // You can use JSON if needed
    sourceModule: String,
    groupID: String, //! Reference to the NotificationGroup model (DO NOT EXIST)
    notes: String,
});

module.exports = mongoose.model('Notification', notificationSchema);