const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    assetID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If assetID should be unique
    },
    assetName: {
        type: String,
        required: true,
    },
    description: String,
    assetType: {
        type: String,
        enum: ['Tangible', 'Intangible', 'Software', 'Hardware', 'Other'], // Add more asset types as needed
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    currency: String,
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Suppliers model
    },
    warrantyExpiryDate: Date, // Optional
    depreciationMethod: String, // Optional
    residualValue: Number, // Optional
    usefulLife: Number, // Optional
    location: String,
    assignedToEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    maintenanceSchedule: String, // Optional
    lastMaintenanceDate: Date, // Optional
    assetStatus: {
        type: String,
        enum: ['Operational', 'Out for Repair', 'Decommissioned', 'Other'], // Add more statuses as needed
    },
    disposalDate: Date, // Optional
    disposalValue: Number, // Optional
    disposalReason: String, // Optional
    serialNumber: String, // Optional
    manufacturer: String,
    model: String,
    image: String, // File URL or base64 encoded string, optional
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

module.exports = mongoose.model('Asset', assetSchema);