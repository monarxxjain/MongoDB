const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// newUser.save()
//     .then(() => {
//         console.log('User saved successfully');
//     })
//     .catch((err) => {
//         console.error(err);
//     });





//!  LET's BEGIN =================================================>

//* Users
const userSchema = new mongoose.Schema({
    userID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If UserID should be unique
    },
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    middleName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    alternateEmail: String,
    phone: String,
    alternatePhone: String,
    dateOfBirth: Date,
    profilePictureURL: String,
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Assuming you have a "Roles" model
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    lastLoginDate: Date,
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: Boolean,
    twoFactorAuthEnabled: Boolean,
    twoFactorAuthKey: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    address: String,
    address2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    languagePreference: {
        type: String, // Or use an enum if you have specific language options
    },
    timeZone: {
        type: String, // Or use an enum if you have specific time zone options
    },
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    accountLockoutUntil: Date,
    securityQuestion1: String,
    securityAnswer1: String,
    securityQuestion2: String,
    securityAnswer2: String,
    referralSource: String,
    notes: String,
});

const User = mongoose.model('User', userSchema);




//* Roles
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

const Role = mongoose.model('Role', roleSchema);




//* Permissions
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

const Permission = mongoose.model('Permission', permissionSchema);




//* Employee Details
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

const EmployeeDetails = mongoose.model('EmployeeDetails', employeeDetailsSchema);




//* Employee Training
const employeeTrainingSchema = new mongoose.Schema({
    trainingID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If TrainingID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    trainingName: String,
    trainingType: {
        type: String,
        enum: ['Onboarding', 'Skills Development', 'Safety', 'Compliance', 'Software', 'Workshop'],
    },
    trainingProvider: String,
    trainingDescription: String,
    startDate: Date,
    endDate: Date,
    duration: Number,
    location: String,
    instructorName: String,
    trainingMaterials: String, // Or use JSON if it's a structured object
    trainingCost: Number,
    certificationReceived: Boolean,
    certificationName: String,
    certificationExpiryDate: Date,
    performanceScore: {
        type: mongoose.Schema.Types.Mixed, // Can be Decimal or String, use Mixed type
    },
    trainingStatus: {
        type: String,
        enum: ['Completed', 'Ongoing', 'Scheduled', 'Cancelled'],
    },
    attachments: String, // Or use JSON if it's a structured object
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
    feedbackLink: String,
    followUpDate: Date,
    notes: String,
});

const EmployeeTraining = mongoose.model('EmployeeTraining', employeeTrainingSchema);




//* Employee Performance
const employeePerformanceSchema = new mongoose.Schema({
    performanceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PerformanceID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    reviewPeriodStart: Date,
    reviewPeriodEnd: Date,
    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model for the Reviewer
    },
    jobRoleExpectation: String,
    tasksCompleted: String, // Or use JSON if it's a structured object
    taskPerformanceRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    skillsetEvaluation: String, // Or use JSON if it's a structured object
    skillsetRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    behavioralEvaluation: String, // Or use JSON if it's a structured object
    behavioralRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    achievements: String,
    areasOfImprovement: String,
    trainingRecommendations: String,
    goalsForNextPeriod: String,
    overallRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    promotionRecommendation: Boolean,
    raiseRecommendation: Number,
    commentsByReviewer: String,
    commentsByEmployee: String,
    nextReviewDate: Date,
    reviewStatus: {
        type: String,
        enum: ['Draft', 'Completed', 'Acknowledged by Employee'],
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
    attachments: String, // Or use JSON if it's a structured object
    acknowledgedByEmployee: Boolean,
    acknowledgmentDate: Date,
    confidentialNotes: String,
    notes: String,
});

const EmployeePerformance = mongoose.model('EmployeePerformance', employeePerformanceSchema);





//* Employee Attendance
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




//* Inventory
const inventorySchema = new mongoose.Schema({
    productID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ProductID should be unique
    },
    productName: String,
    productType: {
        type: String,
        enum: ['Beer', 'Wine', 'Spirits', 'Cider', 'Liquor', 'Mixers', 'Other'],
    },
    brand: String,
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    abv: Number,
    volume: Number,
    batchNumber: String,
    productionDate: Date,
    expirationDate: Date,
    currentStock: Number,
    reservedStock: Number,
    minimumStockLevel: Number,
    purchasePrice: Number,
    sellingPrice: Number,
    location: String,
    barcode: String,
    qrCode: String,
    productDescription: String,
    productImageURL: String,
    productStatus: {
        type: String,
        enum: ['Active', 'Discontinued', 'Out of Stock', 'Other'],
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    lastOrderDate: Date,
    lastSoldDate: Date,
    packaging: {
        type: String,
        enum: ['Bottle', 'Can', 'Box', 'Keg', 'Other'],
    },
    weight: Number,
    dimensions: String,
    countryOfOrigin: String,
    varietal: String,
    vintage: String,
    notes: String,
});

const Inventory = mongoose.model('Inventory', inventorySchema);





//* Products
const productSchema = new mongoose.Schema({
    productID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ProductID should be unique
    },
    productName: String,
    productType: {
        type: String,
        enum: ['Beer', 'Wine', 'Spirits', 'Cider', 'Liquor', 'Mixers', 'Other'],
    },
    brandID: String, //! or Reference to the Brand model (DO NOT EXIST)
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    abv: Number,
    volume: Number,
    productDescription: String,
    barcode: String,
    qrCode: String,
    suggestedRetailPrice: Number,
    productImageURL: String,
    productStatus: {
        type: String,
        enum: ['Active', 'Discontinued', 'Other'],
    },
    packaging: {
        type: String,
        enum: ['Bottle', 'Can', 'Box', 'Keg', 'Other'],
    },
    weight: Number,
    dimensions: String,
    countryOfOrigin: String,
    varietal: String,
    vintage: Number, // Assuming it's a year, so using Number data type
    productionDate: Date,
    expirationDate: Date,
    awards: String,
    pairingSuggestions: String,
    tastingNotes: String,
    batchNumber: String,
    ingredients: String,
    storageInstructions: String,
    servingInstructions: String,
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const Product = mongoose.model('Product', productSchema);





//* Product Categories
const productCategorySchema = new mongoose.Schema({
    categoryId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If categoryId should be unique
    },
    categoryName: String,
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory', // Reference to the ProductCategory model (self-reference)
    },
    categoryDescription: String,
    iconUrl: String,
    displayOrder: Number,
    isActive: Boolean,
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);






//* Product Reviews
const productReviewSchema = new mongoose.Schema({
    reviewId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If reviewId should be unique
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    rating: Number,
    reviewTitle: String,
    reviewContent: String,
    reviewDate: {
        type: Date,
        default: Date.now,
    },
    isVerifiedPurchase: Boolean,
    helpfulVotes: Number,
    unhelpfulVotes: Number,
    reviewStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
    },
    reviewerLocation: String,
    responseUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for response
    },
    responseContent: String,
    responseDate: Date,
    reviewImagesUrls: [String], // Array of image URLs
    flagCount: Number,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const ProductReview = mongoose.model('ProductReview', productReviewSchema);






//* Sales
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

const Sale = mongoose.model('Sale', salesSchema);





//* Sales Target
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

const SalesTarget = mongoose.model('SalesTarget', salesTargetSchema);




//* Orders
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

const Order = mongoose.model('Order', orderSchema);




//* Order Details
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

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);





//* Clients
const clientSchema = new mongoose.Schema({
    clientId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If clientId should be unique
    },
    clientName: String,
    clientType: {
        type: String,
        enum: ['Individual', 'Business'],
    },
    contactFirstName: String,
    contactLastName: String,
    email: String,
    phoneNumber: String,
    alternativePhoneNumber: String,
    faxNumber: String,
    shippingAddressId: String, //! or Reference to the ShippingAddress model (DO NOT EXIST)
    billingAddressId: String, //! Reference to the BillingAddress model (DO NOT EXIST)    
    clientStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    lastOrderDate: Date,
    totalLifetimeValue: Number,
    preferredPaymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    assignedSalesRepId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    taxId: String,
    website: String,
    industryType: String,
    creditLimit: Number,
    outstandingBalance: Number,
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const Client = mongoose.model('Client', clientSchema);





//* Clients Feedbacks
const clientsFeedbackSchema = new mongoose.Schema({
    feedbackId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If feedbackId should be unique
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client model
    },
    feedbackDate: {
        type: Date,
        default: Date.now,
    },
    feedbackChannel: {
        type: String,
        enum: ['Email', 'Phone', 'Website', 'In-Person', 'Other'],
    },
    feedbackCategory: {
        type: String,
        enum: ['Compliment', 'Complaint', 'Suggestion', 'Query', 'Other'],
    },
    feedbackSubject: String,
    feedbackDetail: String,
    feedbackStatus: {
        type: String,
        enum: ['New', 'In Review', 'Addressed', 'Resolved', 'Closed'],
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    resolutionDate: Date,
    resolutionDetail: String,
    clientFollowUpDate: Date,
    clientFollowUpNotes: String,
    feedbackImpact: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    relatedOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    relatedProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    attachments: [String], // Array of attachment URLs
    feedbackRating: {
        type: String,
        enum: ['1-5', '1-10', 'Other'], // You can adjust this enum as needed
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const ClientsFeedback = mongoose.model('ClientsFeedback', clientsFeedbackSchema);




//* Suppliers
const supplierSchema = new mongoose.Schema({
    supplierId: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If supplierId should be unique
    },
    supplierName: String,
    contactFirstName: String,
    contactLastName: String,
    contactTitle: String,
    email: String,
    phoneNumber: String,
    alternativePhoneNumber: String,
    faxNumber: String,
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    website: String,
    supplierType: {
        type: String,
        enum: ['Goods', 'Services', 'Both'],
    },
    supplierStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    lastOrderDate: Date,
    paymentTerms: String,
    bankDetails: String,
    taxId: String,
    preferredCommunicationMethod: {
        type: String,
        enum: ['Email', 'Phone', 'Fax', 'Postal'],
    },
    contractStartDate: Date,
    contractEndDate: Date,
    attachmentLinks: [String], // Array of attachment URLs
    assignedAccountManagerId: {
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

const Supplier = mongoose.model('Supplier', supplierSchema);





//* Supplier Products
const supplierProductSchema = new mongoose.Schema({
    supplierProductID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If supplierProductID should be unique
    },
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    purchasePrice: Number,
    minimumOrderQuantity: Number,
    leadTime: Number,
    discountTerms: String,
    discountPercentage: Number,
    lastPurchasedDate: Date,
    lastPurchasedQuantity: Number,
    contractualStatus: {
        type: String,
        enum: ['On Contract', 'Ad-hoc', 'Not Available'],
    },
    warrantyPeriod: Number,
    returnPolicy: String,
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Out of Stock', 'Discontinued'],
    },
    exclusiveDeal: Boolean,
    attachmentLinks: [String], // Array of attachment URLs
    productRating: {
        type: String,
        enum: ['1', '2', '3', '4', '5'], // Adjust as needed
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const SupplierProduct = mongoose.model('SupplierProduct', supplierProductSchema);





//* Supplier Ratings
const supplierRatingSchema = new mongoose.Schema({
    ratingID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ratingID should be unique
    },
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    ratedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ratingDate: {
        type: Date,
        default: Date.now,
    },
    productQualityScore: Number,
    deliveryPunctualityScore: Number,
    pricingFairnessScore: Number,
    communicationScore: Number,
    supportResponseScore: Number,
    overallRating: Number,
    reviewText: String,
    attachmentsLinks: [String], // Array of attachment URLs
    ratingStatus: {
        type: String,
        enum: ['Draft', 'Finalized', 'Archived'],
    },
    followUpActionRequired: Boolean,
    actionNotes: String,
    followUpActionStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notes: String,
});

const SupplierRating = mongoose.model('SupplierRating', supplierRatingSchema);





//* Contacts
const contactSchema = new mongoose.Schema({
    contractID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If contractID should be unique
    },
    contractName: String,
    contractType: {
        type: String,
        enum: ['Supplier', 'Client', 'Employee', 'Other'],
    },
    relatedEntityID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    startDate: Date,
    endDate: Date,
    duration: Number,
    value: Number,
    paymentTerms: String,
    contractStatus: {
        type: String,
        enum: ['Active', 'Pending', 'Expired', 'Terminated', 'Draft'],
    },
    renewalStatus: {
        type: String,
        enum: ['Auto-renewal', 'Manual', 'Not Renewable'],
    },
    terminationConditions: String,
    specialClauses: String,
    documentLink: String,
    primaryContactID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    lastModified: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    attachments: [String], // Array of attachment URLs
    reviewDate: Date,
    signatoryDetails: String,
    notes: String,
});

const Contact = mongoose.model('Contact', contactSchema);





//* Messages
const messageSchema = new mongoose.Schema({
    messageID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If messageID should be unique
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    recipientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    subject: String,
    messageBody: String,
    sentDateTime: {
        type: Date,
        default: Date.now,
    },
    readDateTime: Date,
    attachmentLinks: [String], // Array of attachment URLs
    threadID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    messageType: {
        type: String,
        enum: ['Direct', 'System Notification', 'Group', 'Other'],
    },
    priority: {
        type: String,
        enum: ['Normal', 'High', 'Urgent'],
    },
    status: {
        type: String,
        enum: ['Unread', 'Read', 'Archived', 'Deleted'],
    },
    replyToMessageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Reference to the Message model
    },
    isStarred: Boolean,
    labels: [String], // Array of label names
    recipientGroupID: String, //! Reference to the RecipientGroup model (DO NOT EXIST)
    deletedBySender: Boolean,
    deletedByRecipient: Boolean,
    notes: String,
});

const Message = mongoose.model('Message', messageSchema);




//* Notifications
const notificationSchema = new mongoose.Schema({
    notificationID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If notificationID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    notificationType: {
        type: String,
        enum: ['System Alert', 'Reminder', 'Update', 'Task', 'Other'],
    },
    title: String,
    message: String,
    createdDateTime: {
        type: Date,
        default: Date.now,
    },
    readDateTime: Date,
    associatedLink: String,
    priority: {
        type: String,
        enum: ['Normal', 'High', 'Critical'],
    },
    status: {
        type: String,
        enum: ['Unread', 'Read', 'Archived', 'Dismissed'],
    },
    triggerEvent: String,
    expirationDateTime: Date,
    icon: String,
    actionButtons: String, // You can use JSON if needed
    sourceModule: String,
    groupID: String, //! Reference to the NotificationGroup model (DO NOT EXIST)
    notes: String,
});

const Notification = mongoose.model('Notification', notificationSchema);





//* Social Media Posts
const socialMediaPostSchema = new mongoose.Schema({
    postID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If postID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    content: String,
    mediaLink: String,
    postedDateTime: {
        type: Date,
        default: Date.now,
    },
    lastEditedDateTime: Date,
    likesCount: Number,
    commentsCount: Number,
    sharesCount: Number,
    visibility: {
        type: String,
        enum: ['Public', 'Friends', 'Only Me', 'Custom'],
    },
    locationTag: String,
    hashtags: [String], // Array of hashtags
    mentionedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    parentPostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    postType: {
        type: String,
        enum: ['Text', 'Image', 'Video', 'Link', 'Other'],
    },
    urls: [String], // Array of URL links
    sourcePlatform: {
        type: String,
        enum: ['Internal', 'Facebook', 'Twitter', 'Other'],
    },
    pinnedStatus: Boolean,
    archivedStatus: Boolean,
    reportCount: Number,
    associatedEventID: String, //! Reference to the Event model (DO NOT EXIST)
    notes: String,
});

const SocialMediaPost = mongoose.model('SocialMediaPost', socialMediaPostSchema);





//* Social Media Comments
const socialMediaCommentSchema = new mongoose.Schema({
    commentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If commentID should be unique
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    parentCommentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaComment', // Reference to the SocialMediaComment model
    },
    content: String,
    postedDateTime: {
        type: Date,
        default: Date.now,
    },
    lastEditedDateTime: Date,
    likesCount: Number,
    mentionedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    mediaLink: String,
    visibility: {
        type: String,
        enum: ['Public', 'Friends', 'Only Me'],
    },
    reportCount: Number,
    hashtags: [String], // Array of hashtags
    status: {
        type: String,
        enum: ['Active', 'Deleted', 'Archived'],
    },
    urls: [String], // Array of URL links
    notes: String,
});

const SocialMediaComment = mongoose.model('SocialMediaComment', socialMediaCommentSchema);




//* Social Media Likes
const socialMediaLikeSchema = new mongoose.Schema({
    likeID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If likeID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaComment', // Reference to the SocialMediaComment model
    },
    likedDateTime: {
        type: Date,
        default: Date.now,
    },
    likeType: {
        type: String,
        enum: ['Like', 'Love', 'Laugh', 'Other'],
    },
    status: {
        type: String,
        enum: ['Active', 'Removed'],
    },
    sourcePlatform: {
        type: String,
        enum: ['Internal', 'Facebook', 'Twitter', 'Other'],
    },
    notes: String,
});

const SocialMediaLike = mongoose.model('SocialMediaLike', socialMediaLikeSchema);





//* Reports
const reportSchema = new mongoose.Schema({
    reportID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If reportID should be unique
    },
    reportName: String,
    reportDescription: String,
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    createdDateTime: {
        type: Date,
        default: Date.now,
    },
    modifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    modifiedDateTime: Date,
    reportType: {
        type: String,
        enum: ['Sales', 'Inventory', 'Marketing', 'Performance', 'Other'],
    },
    reportStatus: {
        type: String,
        enum: ['Draft', 'Finalized', 'Archived'],
    },
    reportPeriodStart: Date,
    reportPeriodEnd: Date,
    dataSources: [String], // Array of data sources
    fileLink: String,
    visibility: {
        type: String,
        enum: ['Public', 'Private', 'Restricted'],
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    approvedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    approvalDateTime: Date,
    reportTags: [String], // Array of report tags
    associatedProjectID: String, //! or Reference to the Project model (DO NOT EXIST)
    notes: String,
});

const Report = mongoose.model('Report', reportSchema);






//* Chat Queries
const chatQuerySchema = new mongoose.Schema({
    queryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If queryID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    sessionID: String,
    queryText: String,
    queryDateTime: {
        type: Date,
        default: Date.now,
    },
    responseText: String,
    responseDateTime: Date,
    responseStatus: {
        type: String,
        enum: ['Successful', 'Failed', 'Pending'],
    },
    responseTime: Number,
    sourcePlatform: {
        type: String,
        enum: ['Web', 'Mobile', 'API'],
    },
    queryContext: {
        type: mongoose.Schema.Types.Mixed, // Can store JSON or Text
    },
    responseError: String,
    queryLanguage: String,
    responseLanguage: String,
    tags: [String], // Array of tags
    userFeedback: String,
    userRating: Number,
    followUpAction: String,
    followUpStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
    },
    associatedTicketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportTicket', // Reference to the Ticket model
    },
    notes: String,
});

const ChatQuery = mongoose.model('ChatQuery', chatQuerySchema);






//* Billing Invoices
const billingInvoiceSchema = new mongoose.Schema({
    invoiceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If invoiceID should be unique
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    invoiceNumber: String,
    invoiceDate: {
        type: Date,
        required: true,
    },
    dueDate: Date,
    billingAddress: String,
    shippingAddress: String,
    totalAmount: Number,
    taxAmount: Number,
    discountAmount: Number,
    subTotal: Number,
    currency: String,
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partial', 'Overdue'],
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Other'],
    },
    invoiceNotes: String,
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    invoiceItems: {
        type: mongoose.Schema.Types.Mixed, // Can store JSON or reference to InvoiceItems table
    },
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    termsAndConditions: String,
    penaltyRate: Number,
    paidDate: Date,
    paymentReference: String,
    bankDetails: String,
    notes: String,
});

const BillingInvoice = mongoose.model('BillingInvoice', billingInvoiceSchema);






//* Payments
const paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If paymentID should be unique
    },
    invoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingInvoice', // Reference to the BillingInvoice model
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentAmount: Number,
    currency: String,
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Other'],
    },
    paymentReference: String,
    paymentStatus: {
        type: String,
        enum: ['Completed', 'Failed', 'Pending', 'Refunded'],
    },
    paymentNotes: String,
    bankName: String,
    cardType: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex', 'Other'],
    },
    cardLastFourDigits: String,
    paymentGateway: String,
    gatewayTransactionID: String,
    isRecurring: Boolean,
    nextPaymentDate: Date,
    paymentFrequency: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Yearly', 'Other'],
    },
    failureReason: String,
    refundAmount: Number,
    refundDate: Date,
    refundReason: String,
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    notes: String,
});

const Payment = mongoose.model('Payment', paymentSchema);





//* Refunds
const refundSchema = new mongoose.Schema({
    refundID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If refundID should be unique
    },
    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment', // Reference to the Payment model
    },
    invoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingInvoice', // Reference to the BillingInvoice model
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    refundDate: {
        type: Date,
        required: true,
    },
    refundAmount: Number,
    currency: String,
    refundMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Original Payment Method', 'Other'],
    },
    refundReference: String,
    refundStatus: {
        type: String,
        enum: ['Completed', 'Failed', 'Pending'],
    },
    refundReason: String,
    bankName: String, // Optional
    cardType: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex', 'Other'], // Optional
    },
    cardLastFourDigits: String, // Optional
    paymentGateway: String,
    gatewayTransactionID: String,
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    originalPaymentDate: Date,
    notes: String,
});

const Refund = mongoose.model('Refund', refundSchema);






//* Expenses
const expenseSchema = new mongoose.Schema({
    expenseID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If expenseID should be unique
    },
    dateIncurred: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: String,
    expenseCategory: {
        type: String,
        enum: ['Travel', 'Meals', 'Rent', 'Utilities', 'Other'], // Add more categories as needed
    },
    description: String,
    receipt: String, // You can store the file path or URL here
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Cheque', 'Other'],
    },
    vendor: String,
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model (optional)
    },
    isReimbursable: Boolean,
    reimbursementStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Reimbursed'],
    },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    approvedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    approvalDate: Date,
    taxAmount: Number,
    taxRate: Number,
    expenseAccount: String, // You can use a string or reference an Accounting model if needed
    createdByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    lastModifiedDate: Date,
    notes: String,
});

const Expense = mongoose.model('Expense', expenseSchema);





//* Expense Categories
const expenseCategorySchema = new mongoose.Schema({
    categoryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If categoryID should be unique
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: String,
    parentCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory', // Reference to the same model (self-referential)
    },
    defaultTaxRate: Number,
    isActive: Boolean,
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
    icon: String, // Optional
    budgetLimit: Number, // Optional
    colorCode: String, // Optional
    notes: String, // Optional
});

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);






//* Asset Management
const assetSchema = new mongoose.Schema({
    assetID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If assetID should be unique
    },
    assetName: {
        type: String,
        required: true,
    },
    description: String,
    assetType: {
        type: String,
        enum: ['Tangible', 'Intangible', 'Software', 'Hardware', 'Other'], // Add more asset types as needed
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    currency: String,
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Suppliers model
    },
    warrantyExpiryDate: Date, // Optional
    depreciationMethod: String, // Optional
    residualValue: Number, // Optional
    usefulLife: Number, // Optional
    location: String,
    assignedToEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    maintenanceSchedule: String, // Optional
    lastMaintenanceDate: Date, // Optional
    assetStatus: {
        type: String,
        enum: ['Operational', 'Out for Repair', 'Decommissioned', 'Other'], // Add more statuses as needed
    },
    disposalDate: Date, // Optional
    disposalValue: Number, // Optional
    disposalReason: String, // Optional
    serialNumber: String, // Optional
    manufacturer: String,
    model: String,
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
    notes: String, // Optional
});

const Asset = mongoose.model('Asset', assetSchema);





//* Vehicle Management
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

const Vehicle = mongoose.model('Vehicle', vehicleSchema);





//* Logistics
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




//* Warehouse Locations
const warehouseLocationSchema = new mongoose.Schema({
    locationID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If locationID should be unique
    },
    warehouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '  ', // Reference to the Warehouse model
        required: true,
    },
    locationCode: String,
    shelfNumber: Number,
    rowNumber: Number,
    tierNumber: Number,
    binNumber: String, // Optional
    capacity: Number,
    currentOccupancy: Number,
    occupancyType: {
        type: String,
        enum: ['Volume', 'Weight', 'Units'],
    },
    temperatureZone: {
        type: String,
        enum: ['Frozen', 'Chilled', 'Ambient', 'Heated', 'Other'], // Add more zones as needed
    },
    humidityControl: Boolean,
    specialAttributes: String, // Optional
    accessibility: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    isOccupied: Boolean,
    associatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model (optional)
    },
    associatedInventoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Reference to the Inventory model (optional)
    },
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
    notes: String, // Optional
});

const WarehouseLocation = mongoose.model('WarehouseLocation', warehouseLocationSchema);






//* Marketing Campaigns
const marketingCampaignSchema = new mongoose.Schema({
    campaignID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If campaignID should be unique
    },
    campaignName: String,
    campaignType: {
        type: String,
        enum: ['Digital', 'Print', 'Event', 'TV', 'Radio', 'Other'], // Add more types as needed
    },
    startDate: Date,
    endDate: Date,
    budget: Number,
    spentAmount: Number,
    targetAudience: String,
    targetRegion: String,
    expectedReach: Number,
    actualReach: Number,
    expectedConversions: Number,
    actualConversions: Number,
    kpis: String,
    channelDetails: String,
    campaignDescription: String,
    campaignStatus: {
        type: String,
        enum: ['Planned', 'Ongoing', 'Completed', 'Paused', 'Cancelled'],
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
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
    assetsURL: String, // Optional
    feedback: String, // Optional
    roi: Number, // Optional
    notes: String, // Optional
});

const MarketingCampaign = mongoose.model('MarketingCampaign', marketingCampaignSchema);






//* Marketing Analytics
const marketingAnalyticsSchema = new mongoose.Schema({
    analyticsID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If analyticsID should be unique
    },
    campaignID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MarketingCampaign', // Reference to the MarketingCampaign model
        required: true,
    },
    date: Date,
    pageViews: Number,
    clicks: Number,
    impressions: Number,
    conversions: Number,
    bounceRate: Number,
    averageSessionDuration: String, // Consider using a proper time format
    costPerClick: Number,
    costPerConversion: Number,
    trafficSource: String,
    deviceType: {
        type: String,
        enum: ['Mobile', 'Desktop', 'Tablet', 'Other'], // Add more types as needed
    },
    location: String,
    newVisitors: Number,
    returningVisitors: Number,
    exitRate: Number,
    topKeywords: String,
    referralURL: String, // Optional
    socialShares: Number,
    ctr: Number,
    feedbackRating: Number, // Optional
    commentsCount: Number,
    engagementRate: Number,
    revenueGenerated: Number,
    adPosition: {
        type: String,
        enum: ['Top', 'Right', 'Bottom', 'Other'], // Add more positions as needed
    },
    adFormat: {
        type: String,
        enum: ['Text', 'Image', 'Video', 'Other'], // Add more formats as needed
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
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
    notes: String, // Optional
});

const MarketingAnalytics = mongoose.model('MarketingAnalytics', marketingAnalyticsSchema);





//* Partnerships
const partnershipSchema = new mongoose.Schema({
    partnershipID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If partnershipID should be unique
    },
    partnerName: String,
    partnershipType: {
        type: String,
        enum: ['Affiliate', 'Distributor', 'Collaborator', 'Other'], // Add more types as needed
    },
    startDate: Date,
    endDate: Date, // Optional
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Terminated', 'Other'], // Add more statuses as needed
    },
    contractID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract', // Reference to the Contracts model
    },
    primaryContactName: String,
    primaryContactEmail: String,
    primaryContactPhone: String,
    revenueShare: Number,
    annualReviewDate: Date,
    logoURL: String, // Optional
    websiteURL: String, // Optional
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    partnershipBenefits: String, // Optional
    partnershipObjectives: String,
    performanceMetrics: String, // Optional
    renewalTerms: String, // Optional
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
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
    notes: String, // Optional
});

const Partnership = mongoose.model('Partnership', partnershipSchema);






//* Events And Promotions
const eventPromoSchema = new mongoose.Schema({
    eventPromoID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If eventPromoID should be unique
    },
    eventPromoName: String,
    eventType: {
        type: String,
        enum: ['Event', 'Promotion', 'Launch', 'Other'], // Add more event types as needed
    },
    startDate: Date,
    endDate: Date,
    location: String, // Optional
    description: String,
    url: String, // Optional
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Other'], // Add more statuses as needed
    },
    targetAudience: String, // Optional
    maxAttendees: Number, // Optional
    cost: Number,
    discountPercentage: Number, // Optional
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Products model (optional)
    },
    promoCode: String, // Optional
    rsvpLink: String, // Optional
    imageURL: String, // Optional
    organizerContactName: String,
    organizerContactEmail: String,
    organizerContactPhone: String,
    sponsor: String, // Optional
    expectedRevenue: Number, // Optional
    actualRevenue: Number, // Optional
    feedbackLink: String, // Optional
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
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
    notes: String, // Optional
});

const EventPromo = mongoose.model('EventPromo', eventPromoSchema);





//* Support Tickets
const supportTicketSchema = new mongoose.Schema({
    ticketID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ticketID should be unique
    },
    subject: String,
    description: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed', 'Reopened'],
    },
    assignedToUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    category: String, // You can create a separate "Category" model and use a reference if needed
    openDate: {
        type: Date,
        default: Date.now,
    },
    closeDate: Date, // Optional
    expectedResolutionDate: Date, // Optional
    actualResolutionDate: Date, // Optional
    resolution: String, // Optional
    relatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Products model (optional)
    },
    attachments: [String], // An array of file URLs or paths
    feedback: String, // Optional
    feedbackComments: String, // Optional
    followUpRequired: Boolean,
    followUpDate: Date, // Optional
    lastUpdatedDate: {
        type: Date,
        default: Date.now,
    },
    lastUpdatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    internalNotes: String, // Optional
    origin: {
        type: String,
        enum: ['Email', 'Web', 'Phone', 'Chat', 'Other'], // Add more origin types as needed
    },
    relatedOrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Orders model (optional)
    },
    escalationLevel: Number, // Optional
    timeToFirstResponse: String, // Optional (can be Time or Duration)
    timeToResolution: String, // Optional (can be Time or Duration)
    notes: String, // Optional
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);






//* Ticket Comments
const ticketCommentSchema = new mongoose.Schema({
    commentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If commentID should be unique
    },
    ticketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportTicket', // Reference to the SupportTicket model
        required: true,
    },
    commentText: String,
    commentedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    commentDate: {
        type: Date,
        default: Date.now,
    },
    attachment: [String], // Array of file URLs or paths (optional)
    commentType: {
        type: String,
        enum: ['User', 'Agent', 'System', 'Other'],
    },
    isInternal: Boolean,
    isEdited: Boolean,
    editedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    editDate: Date, // Optional
    relatedToAction: {
        type: String,
        enum: ['Status Change', 'Resolution Update', 'Escalation', 'Other'],
    },
    previousValue: String, // Optional
    newValue: String, // Optional
    commentMood: {
        type: String,
        enum: ['Neutral', 'Positive', 'Negative', 'Other'],
    },
    notes: String, // Optional
});

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);






//* Shift Schedules
const shiftScheduleSchema = new mongoose.Schema({
    shiftID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If shiftID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    shiftType: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'Other'],
        required: true,
    },
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Roles model (optional)
    },
    locationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Reference to Warehouse Locations or Office Locations model (optional)
    },
    shiftStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Other'],
        required: true,
    },
    breakStartTime: Date, // Optional
    breakEndTime: Date, // Optional
    totalHours: {
        type: Number,
        required: true,
    },
    overtimeHours: {
        type: Number,
        default: 0,
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    swapRequestStatus: {
        type: String,
        enum: ['Requested', 'Approved', 'Denied', 'NotRequested', 'Other'],
    },
    requestedSwapWithEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model (optional)
    },
    swapApprovalByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    notes: String, // Optional
});

const ShiftSchedule = mongoose.model('ShiftSchedule', shiftScheduleSchema);






//* Vacation Requests
const vacationRequestSchema = new mongoose.Schema({
    requestID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If requestID should be unique
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalDaysRequested: {
        type: Number,
        required: true,
    },
    requestDate: {
        type: Date,
        required: true,
    },
    requestStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied', 'Cancelled', 'Other'],
        required: true,
    },
    reasonForVacation: String, // Optional
    managerNotes: String, // Optional
    approvedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    approvalDate: Date, // Optional
    isPaidLeave: Boolean,
    vacationType: {
        type: String,
        enum: ['Annual Leave', 'Sick Leave', 'Personal Day', 'Maternity/Paternity', 'Other'],
    },
    attachedDocuments: String, // File or URL (optional)
    emergencyContactName: String, // Optional
    emergencyContactNumber: String, // Optional
    requestedCoverageEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model (optional)
    },
    coverageStatus: {
        type: String,
        enum: ['NotNeeded', 'Requested', 'Approved', 'Denied', 'Other'],
    },
    returnDate: Date,
    actualReturnDate: Date, // Optional
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    notes: String, // Optional
});

const VacationRequest = mongoose.model('VacationRequest', vacationRequestSchema);






//* HR Policies
const hrPolicySchema = new mongoose.Schema({
    policyID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If policyID should be unique
    },
    policyTitle: {
        type: String,
        required: true,
    },
    policyCategory: {
        type: String,
        enum: ['Attendance', 'Benefits', 'Conduct', 'Equal Opportunity', 'Other'],
        required: true,
    },
    policyVersion: {
        type: String,
        required: true,
    },
    effectiveDate: {
        type: Date,
        required: true,
    },
    endDate: Date, // Optional
    policySummary: String,
    policyDetail: String, // Text or LongText
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    approvalStatus: {
        type: String,
        enum: ['Draft', 'Pending', 'Approved', 'Archived', 'Other'],
        required: true,
    },
    approvedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    approvalDate: Date, // Optional
    relatedDocuments: String, // File or URL (optional)
    associatedDepartment: String, // Optional
    revisionNotes: String, // Optional
    feedbackChannel: String, // Text or URL (optional)
    reviewFrequency: {
        type: String,
        enum: ['Annually', 'Bi-Annually', 'Quarterly', 'Other'],
    },
    nextReviewDate: Date, // Optional
    policyAcknowledgedBy: String, // Text (optional)
    notes: String, // Optional
});

const HrPolicy = mongoose.model('HrPolicy', hrPolicySchema);





//* Company Goals
const companyGoalSchema = new mongoose.Schema({
    goalID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If goalID should be unique
    },
    goalTitle: {
        type: String,
        required: true,
    },
    goalDescription: String,
    startDate: {
        type: Date,
        required: true,
    },
    targetEndDate: {
        type: Date,
        required: true,
    },
    actualEndDate: Date, // Optional
    goalStatus: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Archived', 'Other'],
        required: true,
    },
    goalCategory: {
        type: String,
        enum: ['Financial', 'Operational', 'Strategic', 'HR', 'Marketing', 'Other'],
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    assignedToDepartment: String, // Optional
    assignedToUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    progressPercentage: Number,
    kpis: String, // Text (optional)
    dependencies: String, // Text (optional)
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    resourcesAllocated: String, // Text (optional)
    milestones: String, // Text (optional)
    challenges: String, // Text (optional)
    attachments: String, // File or URL (optional)
    outcome: String, // Text (optional)
    feedback: String, // Text (optional)
    notes: String, // Text (optional)
});

const CompanyGoal = mongoose.model('CompanyGoal', companyGoalSchema);






//* Industry Trends
const industryTrendSchema = new mongoose.Schema({
    trendID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If trendID should be unique
    },
    trendName: {
        type: String,
        required: true,
    },
    trendDescription: String,
    startDate: {
        type: Date,
        required: true,
    },
    peakDate: Date, // Optional
    trendStatus: {
        type: String,
        enum: ['Emerging', 'Peaking', 'Declining', 'Stable', 'Other'],
        required: true,
    },
    trendType: {
        type: String,
        enum: ['Product', 'Consumer Behavior', 'Technology', 'Regulation', 'Other'],
        required: true,
    },
    trendImpact: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    regionsAffected: String, // Optional
    associatedBrands: String, // Text (optional)
    researchSource: String,
    linkToSource: String, // URL (optional)
    additionalSources: String, // Text (optional)
    trendForecast: String,
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    relatedIndustries: String, // Text (optional)
    visuals: String, // File or URL (optional)
    trendRating: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
    },
    relatedTrends: String, // Text (optional)
    opportunities: String, // Text (optional)
    challenges: String, // Text (optional)
    keyPlayers: String, // Text (optional)
    notes: String, // Text (optional)
});

const IndustryTrend = mongoose.model('IndustryTrend', industryTrendSchema);





//* Competitor Analysis
const competitorAnalysisSchema = new mongoose.Schema({
    analysisID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If analysisID should be unique
    },
    competitorName: {
        type: String,
        required: true,
    },
    competitorURL: String, // URL (optional)
    analysisDate: {
        type: Date,
        required: true,
    },
    swotStrengths: String,
    swotWeaknesses: String,
    swotOpportunities: String,
    swotThreats: String,
    marketShare: String,
    keyProducts: String,
    productPricing: String,
    salesStrategy: String,
    marketingStrategy: String,
    operationalStrengths: String,
    financialHealth: String,
    keyPartnerships: String,
    keyLocations: String,
    digitalPresenceRating: String,
    customerFeedback: String,
    innovativeFeatures: String,
    targetAudience: String,
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    lastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    lastModifiedDate: Date, // Optional
    futurePredictions: String,
    visuals: String, // File or URL (optional)
    dataSources: String,
    notes: String, // Text (optional)
});

const CompetitorAnalysis = mongoose.model('CompetitorAnalysis', competitorAnalysisSchema);









app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});