const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
    reviewId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If reviewId should be unique
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    rating: Number,
    reviewTitle: String,
    reviewContent: String,
    reviewDate: {
        type: Date,
        default: Date.now,
    },
    isVerifiedPurchase: Boolean,
    helpfulVotes: Number,
    unhelpfulVotes: Number,
    reviewStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
    },
    reviewerLocation: String,
    responseUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for response
    },
    responseContent: String,
    responseDate: Date,
    reviewImagesUrls: [String], // Array of image URLs
    flagCount: Number,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('ProductReview', productReviewSchema);