const mongoose  = require ('mongoose');

const supplierRatingSchema = new mongoose.Schema({
    ratingID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ratingID should be unique
    },
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    ratedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ratingDate: {
        type: Date,
        default: Date.now,
    },
    productQualityScore: Number,
    deliveryPunctualityScore: Number,
    pricingFairnessScore: Number,
    communicationScore: Number,
    supportResponseScore: Number,
    overallRating: Number,
    reviewText: String,
    attachmentsLinks: [String], // Array of attachment URLs
    ratingStatus: {
        type: String,
        enum: ['Draft', 'Finalized', 'Archived'],
    },
    followUpActionRequired: Boolean,
    actionNotes: String,
    followUpActionStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('SupplierRating', supplierRatingSchema);