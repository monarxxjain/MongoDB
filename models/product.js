const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ProductID should be unique
    },
    productName: String,
    productType: {
        type: String,
        enum: ['Beer', 'Wine', 'Spirits', 'Cider', 'Liquor', 'Mixers', 'Other'],
    },
    brandID: String, //! or Reference to the Brand model (DO NOT EXIST)
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    abv: Number,
    volume: Number,
    productDescription: String,
    barcode: String,
    qrCode: String,
    suggestedRetailPrice: Number,
    productImageURL: String,
    productStatus: {
        type: String,
        enum: ['Active', 'Discontinued', 'Other'],
    },
    packaging: {
        type: String,
        enum: ['Bottle', 'Can', 'Box', 'Keg', 'Other'],
    },
    weight: Number,
    dimensions: String,
    countryOfOrigin: String,
    varietal: String,
    vintage: Number, // Assuming it's a year, so using Number data type
    productionDate: Date,
    expirationDate: Date,
    awards: String,
    pairingSuggestions: String,
    tastingNotes: String,
    batchNumber: String,
    ingredients: String,
    storageInstructions: String,
    servingInstructions: String,
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('Product', productSchema);