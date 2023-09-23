const mongoose = require('mongoose');

const warehouseLocationSchema = new mongoose.Schema({
    locationID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If locationID should be unique
    },
    warehouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '  ', // Reference to the Warehouse model
        required: true,
    },
    locationCode: String,
    shelfNumber: Number,
    rowNumber: Number,
    tierNumber: Number,
    binNumber: String, // Optional
    capacity: Number,
    currentOccupancy: Number,
    occupancyType: {
        type: String,
        enum: ['Volume', 'Weight', 'Units'],
    },
    temperatureZone: {
        type: String,
        enum: ['Frozen', 'Chilled', 'Ambient', 'Heated', 'Other'], // Add more zones as needed
    },
    humidityControl: Boolean,
    specialAttributes: String, // Optional
    accessibility: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    isOccupied: Boolean,
    associatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model (optional)
    },
    associatedInventoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Reference to the Inventory model (optional)
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
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

module.exports= mongoose.model('WarehouseLocation', warehouseLocationSchema);