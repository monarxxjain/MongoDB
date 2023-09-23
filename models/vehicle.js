const mongoose= require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If vehicleID should be unique
    },
    licensePlate: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        enum: ['Car', 'Truck', 'Motorcycle', 'Van', 'Other'], // Add more vehicle types as needed
        required: true,
    },
    make: String,
    model: String,
    year: Number,
    color: String,
    vin: String,
    purchaseDate: Date,
    purchasePrice: Number,
    odometerReadingAtPurchase: Number,
    currentOdometerReading: Number,
    lastServiceDate: Date,
    nextServiceDue: Date,
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'], // Add more fuel types as needed
    },
    insuranceProvider: String,
    insurancePolicyNumber: String,
    insuranceExpiryDate: Date,
    assignedToEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    location: String,
    vehicleStatus: {
        type: String,
        enum: ['Operational', 'Out for Repair', 'Retired', 'Other'], // Add more statuses as needed
        required: true,
    },
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
    tireType: String, // Optional
    tireChangeDate: Date, // Optional
    gpsModuleID: String, // Optional
    notes: String, // Optional
});

module.exports = mongoose.model('Vehicle', vehicleSchema);