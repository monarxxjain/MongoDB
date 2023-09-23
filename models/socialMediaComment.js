const mongoose = require('mongoose');

const socialMediaCommentSchema = new mongoose.Schema({
    commentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If commentID should be unique
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    parentCommentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaComment', // Reference to the SocialMediaComment model
    },
    content: String,
    postedDateTime: {
        type: Date,
        default: Date.now,
    },
    lastEditedDateTime: Date,
    likesCount: Number,
    mentionedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    mediaLink: String,
    visibility: {
        type: String,
        enum: ['Public', 'Friends', 'Only Me'],
    },
    reportCount: Number,
    hashtags: [String], // Array of hashtags
    status: {
        type: String,
        enum: ['Active', 'Deleted', 'Archived'],
    },
    urls: [String], // Array of URL links
    notes: String,
});

module.exports = mongoose.model('SocialMediaComment', socialMediaCommentSchema);
