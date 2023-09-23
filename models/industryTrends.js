const mongoose = require('mongoose');

const industryTrendSchema = new mongoose.Schema({
    trendID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If trendID should be unique
    },
    trendName: {
        type: String,
        required: true,
    },
    trendDescription: String,
    startDate: {
        type: Date,
        required: true,
    },
    peakDate: Date, // Optional
    trendStatus: {
        type: String,
        enum: ['Emerging', 'Peaking', 'Declining', 'Stable', 'Other'],
        required: true,
    },
    trendType: {
        type: String,
        enum: ['Product', 'Consumer Behavior', 'Technology', 'Regulation', 'Other'],
        required: true,
    },
    trendImpact: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    regionsAffected: String, // Optional
    associatedBrands: String, // Text (optional)
    researchSource: String,
    linkToSource: String, // URL (optional)
    additionalSources: String, // Text (optional)
    trendForecast: String,
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    relatedIndustries: String, // Text (optional)
    visuals: String, // File or URL (optional)
    trendRating: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
    },
    relatedTrends: String, // Text (optional)
    opportunities: String, // Text (optional)
    challenges: String, // Text (optional)
    keyPlayers: String, // Text (optional)
    notes: String, // Text (optional)
});

module.exports = mongoose.model('IndustryTrend', industryTrendSchema);