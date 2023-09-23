const mongoose =require('mongoose');

const competitorAnalysisSchema = new mongoose.Schema({
    analysisID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If analysisID should be unique
    },
    competitorName: {
        type: String,
        required: true,
    },
    competitorURL: String, // URL (optional)
    analysisDate: {
        type: Date,
        required: true,
    },
    swotStrengths: String,
    swotWeaknesses: String,
    swotOpportunities: String,
    swotThreats: String,
    marketShare: String,
    keyProducts: String,
    productPricing: String,
    salesStrategy: String,
    marketingStrategy: String,
    operationalStrengths: String,
    financialHealth: String,
    keyPartnerships: String,
    keyLocations: String,
    digitalPresenceRating: String,
    customerFeedback: String,
    innovativeFeatures: String,
    targetAudience: String,
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
    futurePredictions: String,
    visuals: String, // File or URL (optional)
    dataSources: String,
    notes: String, // Text (optional)
});

module.exports = mongoose.model('CompetitorAnalysis', competitorAnalysisSchema);