const mongoose = require('mongoose');

const socialMediaLikeSchema = new mongoose.Schema({
    likeID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If likeID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaComment', // Reference to the SocialMediaComment model
    },
    likedDateTime: {
        type: Date,
        default: Date.now,
    },
    likeType: {
        type: String,
        enum: ['Like', 'Love', 'Laugh', 'Other'],
    },
    status: {
        type: String,
        enum: ['Active', 'Removed'],
    },
    sourcePlatform: {
        type: String,
        enum: ['Internal', 'Facebook', 'Twitter', 'Other'],
    },
    notes: String,
});

module.exports = mongoose.model('SocialMediaLike', socialMediaLikeSchema);