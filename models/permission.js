const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PermissionID should be unique
    },
    permissionName: {
        type: String,
        required: true,
    },
    description: String,
    isActive: {
        type: Boolean,
        default: true,
    },
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
    category: String,
    isCritical: Boolean,
    associatedModule: String, // Or reference to a "Modules" model if needed
    defaultState: Boolean,
    iconURL: String,
    visibilityScope: {
        type: String,
        enum: ['Public', 'Private', 'Hidden'],
    },
    isRevocable: Boolean,
    rolePermissionID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Role model
    },
    permissionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to the Permission model (self-reference)
    },
    dateAssigned: Date,
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    permissionCode: String,
    displayOrder: Number,
    isSystemDefault: Boolean,
    dependentOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to the Permission model (self-reference)
    },
    permissionLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
    },
    expiresOn: Date,
    colorCode: String,
    aPIEndpoint: String,
    isExternal: Boolean,
    tags: [String], // Array of strings for Tags
    canInherit: Boolean,
    permissionGroup: String, // Or reference to a "PermissionGroups" model if needed
    notes: String,
});

module.exports = mongoose.model('Permission', permissionSchema);