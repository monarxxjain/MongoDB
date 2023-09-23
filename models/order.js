const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If orderId should be unique
    },
    customerId: String, //! Reference to the Customer model (DO NOT EXIST)    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    shippingAddressId: String, //! or Reference to the ShippingAddress model (DO NOT EXIST)
    billingAddressId: String, //! Reference to the BillingAddress model (DO NOT EXIST)    
    orderStatus: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
    },
    totalAmount: Number,
    taxAmount: Number,
    discountAmount: Number,
    finalAmount: Number,
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Partial', 'Refunded'],
    },
    paymentDate: Date,
    refundAmount: Number,
    refundDate: Date,
    orderNotes: String,
    trackingNumber: String,
    courierService: String,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

module.exports = mongoose.model('Order', orderSchema);