const mongoose = require('mongoose');

const expenseCategorySchema = new mongoose.Schema({
    categoryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If categoryID should be unique
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: String,
    parentCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory', // Reference to the same model (self-referential)
    },
    defaultTaxRate: Number,
    isActive: Boolean,
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
    icon: String, // Optional
    budgetLimit: Number, // Optional
    colorCode: String, // Optional
    notes: String, // Optional
});

module.exports = mongoose.model('ExpenseCategory', expenseCategorySchema);