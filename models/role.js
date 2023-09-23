const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If RoleID should be unique
    },
    roleName: {
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
    rolePriority: Number,
    isDefault: Boolean,
    colorCode: String,
    iconURL: String,
    maxAllowed: Number,
    roleAbbreviation: String,
    visibilityScope: {
        type: String,
        enum: ['Public', 'Private', 'Hidden'],
    },
    parentRoleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Role model (self-reference)
    },
    isExternal: Boolean,
    expiresOn: Date,
    roleTags: [String], // Array of strings for RoleTags
    assignedModule: String, // Or reference to a "Modules" model if needed
    roleGroup: String, // Or reference to a "RoleGroups" model if needed
    isBillingRelated: Boolean,
    isRevocable: Boolean,
    notes: String,
});

module.exports = mongoose.model('Role', roleSchema);
