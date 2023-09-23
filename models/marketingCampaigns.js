const mongoose = require('mongoose');

const marketingCampaignSchema = new mongoose.Schema({
    campaignID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If campaignID should be unique
    },
    campaignName: String,
    campaignType: {
        type: String,
        enum: ['Digital', 'Print', 'Event', 'TV', 'Radio', 'Other'], // Add more types as needed
    },
    startDate: Date,
    endDate: Date,
    budget: Number,
    spentAmount: Number,
    targetAudience: String,
    targetRegion: String,
    expectedReach: Number,
    actualReach: Number,
    expectedConversions: Number,
    actualConversions: Number,
    kpis: String,
    channelDetails: String,
    campaignDescription: String,
    campaignStatus: {
        type: String,
        enum: ['Planned', 'Ongoing', 'Completed', 'Paused', 'Cancelled'],
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
    assetsURL: String, // Optional
    feedback: String, // Optional
    roi: Number, // Optional
    notes: String, // Optional
});

module.exports = mongoose.model('MarketingCampaign', marketingCampaignSchema);