const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    orderDetailId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If orderDetailId should be unique
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    productName: String,
    quantityOrdered: Number,
    unitPrice: Number,
    discount: Number,
    totalItemAmount: Number,
    itemStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Returned', 'Cancelled'],
    },
    expectedDeliveryDate: Date,
    actualDeliveryDate: Date,
    returnDate: Date,
    returnReason: String,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);