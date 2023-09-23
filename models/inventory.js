const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
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
    brand: String,
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    abv: Number,
    volume: Number,
    batchNumber: String,
    productionDate: Date,
    expirationDate: Date,
    currentStock: Number,
    reservedStock: Number,
    minimumStockLevel: Number,
    purchasePrice: Number,
    sellingPrice: Number,
    location: String,
    barcode: String,
    qrCode: String,
    productDescription: String,
    productImageURL: String,
    productStatus: {
        type: String,
        enum: ['Active', 'Discontinued', 'Out of Stock', 'Other'],
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    lastOrderDate: Date,
    lastSoldDate: Date,
    packaging: {
        type: String,
        enum: ['Bottle', 'Can', 'Box', 'Keg', 'Other'],
    },
    weight: Number,
    dimensions: String,
    countryOfOrigin: String,
    varietal: String,
    vintage: String,
    notes: String,
});

module.exports= mongoose.model('Inventory', inventorySchema);