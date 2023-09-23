const mongoose = require('mongoose');

const logisticsSchema = new mongoose.Schema({
    logisticID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If logisticID should be unique
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Orders model
    },
    vehicleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle', // Reference to the Vehicle Management model
    },
    departureLocation: String,
    destinationLocation: String,
    scheduledDeparture: Date,
    actualDeparture: Date,
    scheduledArrival: Date,
    actualArrival: Date, // Optional
    currentStatus: {
        type: String,
        enum: ['Scheduled', 'In Transit', 'Delayed', 'Completed', 'Other'], // Add more statuses as needed
        required: true,
    },
    driverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    weight: Number,
    volume: Number,
    numberOfItems: Number,
    transportMode: {
        type: String,
        enum: ['Road', 'Air', 'Sea', 'Rail', 'Other'], // Add more transport modes as needed
    },
    carrierName: String,
    carrierTrackingNumber: String,
    logisticCost: Number,
    temperatureRequired: Number, // Optional
    currentTemperature: Number, // Optional
    humidityLevel: Number, // Optional
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
    incidentReport: String, // Optional
    signatureOfReceiver: String, // File URL or base64 encoded string, optional
    receivedDate: Date, // Optional
    notes: String, // Optional
});

const Logistics = mongoose.model('Logistics', logisticsSchema);