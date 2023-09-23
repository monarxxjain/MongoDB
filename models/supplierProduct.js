const mongoose =require('mongoose')

const supplierProductSchema = new mongoose.Schema({
    supplierProductID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If supplierProductID should be unique
    },
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    purchasePrice: Number,
    minimumOrderQuantity: Number,
    leadTime: Number,
    discountTerms: String,
    discountPercentage: Number,
    lastPurchasedDate: Date,
    lastPurchasedQuantity: Number,
    contractualStatus: {
        type: String,
        enum: ['On Contract', 'Ad-hoc', 'Not Available'],
    },
    warrantyPeriod: Number,
    returnPolicy: String,
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Out of Stock', 'Discontinued'],
    },
    exclusiveDeal: Boolean,
    attachmentLinks: [String], // Array of attachment URLs
    productRating: {
        type: String,
        enum: ['1', '2', '3', '4', '5'], // Adjust as needed
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('SupplierProduct', supplierProductSchema);