const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    categoryId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If categoryId should be unique
    },
    categoryName: String,
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory', // Reference to the ProductCategory model (self-reference)
    },
    categoryDescription: String,
    iconUrl: String,
    displayOrder: Number,
    isActive: Boolean,
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

module.exports = mongoose.model('ProductCategory', productCategorySchema);