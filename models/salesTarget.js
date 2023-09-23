const mongoose = require('mongoose');

const salesTargetSchema = new mongoose.Schema({
    targetId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If targetId should be unique
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    startDate: Date,
    endDate: Date,
    productCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory', // Reference to the ProductCategory model
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    targetQuantity: Number,
    targetRevenue: Number,
    actualQuantity: Number,
    actualRevenue: Number,
    targetStatus: {
        type: String,
        enum: ['Achieved', 'Pending', 'Missed'],
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('SalesTarget', salesTargetSchema);