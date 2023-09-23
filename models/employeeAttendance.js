const mongoose = require('mongoose');

const employeeAttendanceSchema = new mongoose.Schema({
    attendanceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If AttendanceID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    date: Date,
    clockInTime: Date,
    clockOutTime: Date,
    breakStartTime: Date,
    breakEndTime: Date,
    totalHoursWorked: Number,
    overtimeHours: Number,
    attendanceStatus: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Early Departure', 'On Leave'],
    },
    leaveType: {
        type: String,
        enum: ['Sick', 'Vacation', 'Unpaid', 'Paid', 'Bereavement', 'Maternity/Paternity', 'Other'],
    },
    lateReason: String,
    earlyDepartureReason: String,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    location: String,
    shiftType: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'Flexible'],
    },
    shiftStartTime: Date,
    shiftEndTime: Date,
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    attachments: String, // Or use JSON if it's a structured object
    notes: String,
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);