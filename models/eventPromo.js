const mongoose = require('mongoose');

const eventPromoSchema = new mongoose.Schema({
    eventPromoID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If eventPromoID should be unique
    },
    eventPromoName: String,
    eventType: {
        type: String,
        enum: ['Event', 'Promotion', 'Launch', 'Other'], // Add more event types as needed
    },
    startDate: Date,
    endDate: Date,
    location: String, // Optional
    description: String,
    url: String, // Optional
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Other'], // Add more statuses as needed
    },
    targetAudience: String, // Optional
    maxAttendees: Number, // Optional
    cost: Number,
    discountPercentage: Number, // Optional
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Products model (optional)
    },
    promoCode: String, // Optional
    rsvpLink: String, // Optional
    imageURL: String, // Optional
    organizerContactName: String,
    organizerContactEmail: String,
    organizerContactPhone: String,
    sponsor: String, // Optional
    expectedRevenue: Number, // Optional
    actualRevenue: Number, // Optional
    feedbackLink: String, // Optional
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

module.exports = mongoose.model('EventPromo', eventPromoSchema);