const mongoose = require('mongoose');

const employeeDetailsSchema = new mongoose.Schema({
    employeeID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If EmployeeID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    firstName: String,
    lastName: String,
    middleName: String,
    fullName: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-Binary', 'Other'],
    },
    nationality: String,
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    ssn: String, // Or NationalID, use one field based on your requirements
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phoneNumber: String,
    alternativePhoneNumber: String,
    emergencyContactName: String,
    emergencyContactNumber: String,
    email: String,
    personalEmail: String,
    hireDate: Date,
    terminationDate: Date,
    position: String,
    department: String,
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model (self-reference)
    },
    employeeStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
    },
    salary: Number,
    bankDetails: String, // Or use JSON if it's a structured object
    benefits: String, // Or use JSON if it's a structured object
    profilePhotoURL: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    badgeID: String,
    trainingCompleted: String, // Or use JSON if it's a structured object
    notes: String,
});

module.exports = mongoose.model('EmployeeDetails', employeeDetailsSchema);