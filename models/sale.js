const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    saleId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If saleId should be unique
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    customerId: String, //! or Reference to the Customer model (DO NOT EXIST)
    invoiceNumber: String,
    quantitySold: Number,
    salePrice: Number,
    totalAmount: Number,
    discountAmount: Number,
    finalAmount: Number,
    saleDate: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Partial', 'Refunded'],
    },
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Dispatched', 'Delivered', 'Returned'],
    },
    deliveryDate: Date,
    shippingAddressId: String, //! or Reference to the ShippingAddress model (DO NOT EXIST)
    refundReason: String,
    refundDate: Date,
    taxAmount: Number,
    commissionAmount: Number,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('Sale', salesSchema);