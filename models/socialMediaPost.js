const mongoose = require('mongoose');

const socialMediaPostSchema = new mongoose.Schema({
    postID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If postID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    content: String,
    mediaLink: String,
    postedDateTime: {
        type: Date,
        default: Date.now,
    },
    lastEditedDateTime: Date,
    likesCount: Number,
    commentsCount: Number,
    sharesCount: Number,
    visibility: {
        type: String,
        enum: ['Public', 'Friends', 'Only Me', 'Custom'],
    },
    locationTag: String,
    hashtags: [String], // Array of hashtags
    mentionedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    parentPostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    postType: {
        type: String,
        enum: ['Text', 'Image', 'Video', 'Link', 'Other'],
    },
    urls: [String], // Array of URL links
    sourcePlatform: {
        type: String,
        enum: ['Internal', 'Facebook', 'Twitter', 'Other'],
    },
    pinnedStatus: Boolean,
    archivedStatus: Boolean,
    reportCount: Number,
    associatedEventID: String, //! Reference to the Event model (DO NOT EXIST)
    notes: String,
});

module.exports = mongoose.model('SocialMediaPost', socialMediaPostSchema);