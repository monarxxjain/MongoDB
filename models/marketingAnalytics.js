const mongoose = require('mongoose');

const marketingAnalyticsSchema = new mongoose.Schema({
    analyticsID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If analyticsID should be unique
    },
    campaignID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MarketingCampaign', // Reference to the MarketingCampaign model
        required: true,
    },
    date: Date,
    pageViews: Number,
    clicks: Number,
    impressions: Number,
    conversions: Number,
    bounceRate: Number,
    averageSessionDuration: String, // Consider using a proper time format
    costPerClick: Number,
    costPerConversion: Number,
    trafficSource: String,
    deviceType: {
        type: String,
        enum: ['Mobile', 'Desktop', 'Tablet', 'Other'], // Add more types as needed
    },
    location: String,
    newVisitors: Number,
    returningVisitors: Number,
    exitRate: Number,
    topKeywords: String,
    referralURL: String, // Optional
    socialShares: Number,
    ctr: Number,
    feedbackRating: Number, // Optional
    commentsCount: Number,
    engagementRate: Number,
    revenueGenerated: Number,
    adPosition: {
        type: String,
        enum: ['Top', 'Right', 'Bottom', 'Other'], // Add more positions as needed
    },
    adFormat: {
        type: String,
        enum: ['Text', 'Image', 'Video', 'Other'], // Add more formats as needed
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    modifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    modifiedDate: Date, // Optional
    notes: String, // Optional
});

module.exports = mongoose.model('MarketingAnalytics', marketingAnalyticsSchema);