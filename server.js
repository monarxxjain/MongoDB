// server.js
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
    UserID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If UserID should be unique
    },
    Username: {
        type: String,
        required: true,
    },
    PasswordHash: {
        type: String,
        required: true,
    },
    Salt: {
        type: String,
        required: true,
    },
    FirstName: String,
    LastName: String,
    MiddleName: String,
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    AlternateEmail: String,
    Phone: String,
    AlternatePhone: String,
    DateOfBirth: Date,
    ProfilePictureURL: String,
    RoleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Assuming you have a "Roles" model
    },
    DateJoined: {
        type: Date,
        default: Date.now,
    },
    LastLoginDate: Date,
    IsActive: {
        type: Boolean,
        default: true,
    },
    IsAdmin: Boolean,
    TwoFactorAuthEnabled: Boolean,
    TwoFactorAuthKey: String,
    ResetPasswordToken: String,
    ResetPasswordExpiry: Date,
    Address: String,
    Address2: String,
    City: String,
    State: String,
    PostalCode: String,
    Country: String,
    LanguagePreference: {
        type: String, // Or use an enum if you have specific language options
    },
    TimeZone: {
        type: String, // Or use an enum if you have specific time zone options
    },
    FailedLoginAttempts: {
        type: Number,
        default: 0,
    },
    AccountLockoutUntil: Date,
    SecurityQuestion1: String,
    SecurityAnswer1: String,
    SecurityQuestion2: String,
    SecurityAnswer2: String,
    ReferralSource: String,
    Notes: String,
});

const User = mongoose.model('User', userSchema);




//* Roles
const roleSchema = new mongoose.Schema({
    RoleID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If RoleID should be unique
    },
    RoleName: {
        type: String,
        required: true,
    },
    Description: String,
    IsActive: {
        type: Boolean,
        default: true,
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    RolePriority: Number,
    IsDefault: Boolean,
    ColorCode: String,
    IconURL: String,
    MaxAllowed: Number,
    RoleAbbreviation: String,
    VisibilityScope: {
        type: String,
        enum: ['Public', 'Private', 'Hidden'],
    },
    ParentRoleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Role model (self-reference)
    },
    IsExternal: Boolean,
    ExpiresOn: Date,
    RoleTags: [String], // Array of strings for RoleTags
    AssignedModule: String, // Or reference to a "Modules" model if needed
    RoleGroup: String, // Or reference to a "RoleGroups" model if needed
    IsBillingRelated: Boolean,
    IsRevocable: Boolean,
    Notes: String,
});

const Role = mongoose.model('Role', roleSchema);




//* Permissions
const permissionSchema = new mongoose.Schema({
    PermissionID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PermissionID should be unique
    },
    PermissionName: {
        type: String,
        required: true,
    },
    Description: String,
    IsActive: {
        type: Boolean,
        default: true,
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Category: String,
    IsCritical: Boolean,
    AssociatedModule: String, // Or reference to a "Modules" model if needed
    DefaultState: Boolean,
    IconURL: String,
    VisibilityScope: {
        type: String,
        enum: ['Public', 'Private', 'Hidden'],
    },
    IsRevocable: Boolean,
    RolePermissionID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    RoleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Role model
    },
    PermissionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to the Permission model (self-reference)
    },
    DateAssigned: Date,
    AssignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    PermissionCode: String,
    DisplayOrder: Number,
    IsSystemDefault: Boolean,
    DependentOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to the Permission model (self-reference)
    },
    PermissionLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
    },
    ExpiresOn: Date,
    ColorCode: String,
    APIEndpoint: String,
    IsExternal: Boolean,
    Tags: [String], // Array of strings for Tags
    CanInherit: Boolean,
    PermissionGroup: String, // Or reference to a "PermissionGroups" model if needed
    Notes: String,
});

const Permission = mongoose.model('Permission', permissionSchema);




//* Employee Details
const employeeDetailsSchema = new mongoose.Schema({
    EmployeeID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If EmployeeID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    FirstName: String,
    LastName: String,
    MiddleName: String,
    FullName: String,
    DateOfBirth: Date,
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-Binary', 'Other'],
    },
    Nationality: String,
    MaritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    SSN: String, // Or NationalID, use one field based on your requirements
    Address: String,
    City: String,
    State: String,
    ZipCode: String,
    Country: String,
    PhoneNumber: String,
    AlternativePhoneNumber: String,
    EmergencyContactName: String,
    EmergencyContactNumber: String,
    Email: String,
    PersonalEmail: String,
    HireDate: Date,
    TerminationDate: Date,
    Position: String,
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to the Department model
    },
    ManagerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model (self-reference)
    },
    EmployeeStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
    },
    Salary: Number,
    BankDetails: String, // Or use JSON if it's a structured object
    Benefits: String, // Or use JSON if it's a structured object
    ProfilePhotoURL: String,
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    BadgeID: String,
    TrainingCompleted: String, // Or use JSON if it's a structured object
    Notes: String,
});

const EmployeeDetails = mongoose.model('EmployeeDetails', employeeDetailsSchema);




//* Employee Training
const employeeTrainingSchema = new mongoose.Schema({
    TrainingID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If TrainingID should be unique
    },
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    TrainingName: String,
    TrainingType: {
        type: String,
        enum: ['Onboarding', 'Skills Development', 'Safety', 'Compliance', 'Software', 'Workshop'],
    },
    TrainingProvider: String,
    TrainingDescription: String,
    StartDate: Date,
    EndDate: Date,
    Duration: Number,
    Location: String,
    InstructorName: String,
    TrainingMaterials: String, // Or use JSON if it's a structured object
    TrainingCost: Number,
    CertificationReceived: Boolean,
    CertificationName: String,
    CertificationExpiryDate: Date,
    PerformanceScore: {
        type: mongoose.Schema.Types.Mixed, // Can be Decimal or String, use Mixed type
    },
    TrainingStatus: {
        type: String,
        enum: ['Completed', 'Ongoing', 'Scheduled', 'Cancelled'],
    },
    Attachments: String, // Or use JSON if it's a structured object
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    FeedbackLink: String,
    FollowUpDate: Date,
    Notes: String,
});

const EmployeeTraining = mongoose.model('EmployeeTraining', employeeTrainingSchema);




//* Employee Performance
const employeePerformanceSchema = new mongoose.Schema({
    PerformanceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PerformanceID should be unique
    },
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    ReviewPeriodStart: Date,
    ReviewPeriodEnd: Date,
    ReviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model for the Reviewer
    },
    JobRoleExpectation: String,
    TasksCompleted: String, // Or use JSON if it's a structured object
    TaskPerformanceRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    SkillsetEvaluation: String, // Or use JSON if it's a structured object
    SkillsetRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    BehavioralEvaluation: String, // Or use JSON if it's a structured object
    BehavioralRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    Achievements: String,
    AreasOfImprovement: String,
    TrainingRecommendations: String,
    GoalsForNextPeriod: String,
    OverallRating: {
        type: mongoose.Schema.Types.Mixed, // Can be Enum or Decimal, use Mixed type
    },
    PromotionRecommendation: Boolean,
    RaiseRecommendation: Number,
    CommentsByReviewer: String,
    CommentsByEmployee: String,
    NextReviewDate: Date,
    ReviewStatus: {
        type: String,
        enum: ['Draft', 'Completed', 'Acknowledged by Employee'],
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Attachments: String, // Or use JSON if it's a structured object
    AcknowledgedByEmployee: Boolean,
    AcknowledgmentDate: Date,
    ConfidentialNotes: String,
    Notes: String,
});

const EmployeePerformance = mongoose.model('EmployeePerformance', employeePerformanceSchema);





//* Employee Attendance
const employeeAttendanceSchema = new mongoose.Schema({
    AttendanceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If AttendanceID should be unique
    },
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    Date: Date,
    ClockInTime: Date,
    ClockOutTime: Date,
    BreakStartTime: Date,
    BreakEndTime: Date,
    TotalHoursWorked: Number,
    OvertimeHours: Number,
    AttendanceStatus: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Early Departure', 'On Leave'],
    },
    LeaveType: {
        type: String,
        enum: ['Sick', 'Vacation', 'Unpaid', 'Paid', 'Bereavement', 'Maternity/Paternity', 'Other'],
    },
    LateReason: String,
    EarlyDepartureReason: String,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    Location: String,
    ShiftType: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'Flexible'],
    },
    ShiftStartTime: Date,
    ShiftEndTime: Date,
    VerifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Attachments: String, // Or use JSON if it's a structured object
    Notes: String,
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);




//* Inventory
const inventorySchema = new mongoose.Schema({
    ProductID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ProductID should be unique
    },
    ProductName: String,
    ProductType: {
        type: String,
        enum: ['Beer', 'Wine', 'Spirits', 'Cider', 'Liquor', 'Mixers', 'Other'],
    },
    Brand: String,
    SupplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    ABV: Number,
    Volume: Number,
    BatchNumber: String,
    ProductionDate: Date,
    ExpirationDate: Date,
    CurrentStock: Number,
    ReservedStock: Number,
    MinimumStockLevel: Number,
    PurchasePrice: Number,
    SellingPrice: Number,
    Location: String,
    Barcode: String,
    QRCode: String,
    ProductDescription: String,
    ProductImageURL: String,
    ProductStatus: {
        type: String,
        enum: ['Active', 'Discontinued', 'Out of Stock', 'Other'],
    },
    DateAdded: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    LastOrderDate: Date,
    LastSoldDate: Date,
    Packaging: {
        type: String,
        enum: ['Bottle', 'Can', 'Box', 'Keg', 'Other'],
    },
    Weight: Number,
    Dimensions: String,
    CountryOfOrigin: String,
    Varietal: String,
    Vintage: String,
    Notes: String,
});

const Inventory = mongoose.model('Inventory', inventorySchema);





//* Products
const productSchema = new mongoose.Schema({
    ProductID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ProductID should be unique
    },
    ProductName: String,
    ProductType: {
        type: String,
        enum: ['Beer', 'Wine', 'Spirits', 'Cider', 'Liquor', 'Mixers', 'Other'],
    },
    BrandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand', // Reference to the Brand model
    },
    SupplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    ABV: Number,
    Volume: Number,
    ProductDescription: String,
    Barcode: String,
    QRCode: String,
    SuggestedRetailPrice: Number,
    ProductImageURL: String,
    ProductStatus: {
        type: String,
        enum: ['Active', 'Discontinued', 'Other'],
    },
    Packaging: {
        type: String,
        enum: ['Bottle', 'Can', 'Box', 'Keg', 'Other'],
    },
    Weight: Number,
    Dimensions: String,
    CountryOfOrigin: String,
    Varietal: String,
    Vintage: Number, // Assuming it's a year, so using Number data type
    ProductionDate: Date,
    ExpirationDate: Date,
    Awards: String,
    PairingSuggestions: String,
    TastingNotes: String,
    BatchNumber: String,
    Ingredients: String,
    StorageInstructions: String,
    ServingInstructions: String,
    DateAdded: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const Product = mongoose.model('Product', productSchema);





//* Product Categories
const productCategorySchema = new mongoose.Schema({
    CategoryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If CategoryID should be unique
    },
    CategoryName: String,
    ParentCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory', // Reference to the ProductCategory model (self-reference)
    },
    CategoryDescription: String,
    IconURL: String,
    DisplayOrder: Number,
    IsActive: Boolean,
    DateAdded: {
        type: Date,
        default: Date.now,
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);






//* Product Reviews
const productReviewSchema = new mongoose.Schema({
    ReviewID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ReviewID should be unique
    },
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Rating: Number,
    ReviewTitle: String,
    ReviewContent: String,
    ReviewDate: {
        type: Date,
        default: Date.now,
    },
    IsVerifiedPurchase: Boolean,
    HelpfulVotes: Number,
    UnhelpfulVotes: Number,
    ReviewStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
    },
    ReviewerLocation: String,
    ResponseUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for response
    },
    ResponseContent: String,
    ResponseDate: Date,
    ReviewImagesURLs: [String], // Array of image URLs
    FlagCount: Number,
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const ProductReview = mongoose.model('ProductReview', productReviewSchema);






//* Sales
const salesSchema = new mongoose.Schema({
    SaleID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If SaleID should be unique
    },
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
    },
    InvoiceNumber: String,
    QuantitySold: Number,
    SalePrice: Number,
    TotalAmount: Number,
    DiscountAmount: Number,
    FinalAmount: Number,
    SaleDate: {
        type: Date,
        default: Date.now,
    },
    PaymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    PaymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Partial', 'Refunded'],
    },
    DeliveryStatus: {
        type: String,
        enum: ['Pending', 'Dispatched', 'Delivered', 'Returned'],
    },
    DeliveryDate: Date,
    ShippingAddressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress', // Reference to the ShippingAddress model
    },
    RefundReason: String,
    RefundDate: Date,
    TaxAmount: Number,
    CommissionAmount: Number,
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const Sale = mongoose.model('Sale', salesSchema);





//* Sales Target
const salesTargetSchema = new mongoose.Schema({
    TargetID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If TargetID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    StartDate: Date,
    EndDate: Date,
    ProductCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory', // Reference to the ProductCategory model
    },
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    TargetQuantity: Number,
    TargetRevenue: Number,
    ActualQuantity: Number,
    ActualRevenue: Number,
    TargetStatus: {
        type: String,
        enum: ['Achieved', 'Pending', 'Missed'],
    },
    AssignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const SalesTarget = mongoose.model('SalesTarget', salesTargetSchema);




//* Orders
const orderSchema = new mongoose.Schema({
    OrderID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If OrderID should be unique
    },
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    OrderDate: {
        type: Date,
        default: Date.now,
    },
    EstimatedDeliveryDate: Date,
    ActualDeliveryDate: Date,
    ShippingAddressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress', // Reference to the ShippingAddress model
    },
    BillingAddressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingAddress', // Reference to the BillingAddress model
    },
    OrderStatus: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
    },
    TotalAmount: Number,
    TaxAmount: Number,
    DiscountAmount: Number,
    FinalAmount: Number,
    PaymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    PaymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Partial', 'Refunded'],
    },
    PaymentDate: Date,
    RefundAmount: Number,
    RefundDate: Date,
    OrderNotes: String,
    TrackingNumber: String,
    CourierService: String,
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const Order = mongoose.model('Order', orderSchema);




//* Order Details
const orderDetailSchema = new mongoose.Schema({
    OrderDetailID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If OrderDetailID should be unique
    },
    OrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    ProductName: String,
    QuantityOrdered: Number,
    UnitPrice: Number,
    Discount: Number,
    TotalItemAmount: Number,
    ItemStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Returned', 'Cancelled'],
    },
    ExpectedDeliveryDate: Date,
    ActualDeliveryDate: Date,
    ReturnDate: Date,
    ReturnReason: String,
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);





//* Clients
const clientSchema = new mongoose.Schema({
    ClientID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ClientID should be unique
    },
    ClientName: String,
    ClientType: {
        type: String,
        enum: ['Individual', 'Business'],
    },
    ContactFirstName: String,
    ContactLastName: String,
    Email: String,
    PhoneNumber: String,
    AlternativePhoneNumber: String,
    FaxNumber: String,
    BillingAddressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingAddress', // Reference to the BillingAddress model
    },
    ShippingAddressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress', // Reference to the ShippingAddress model
    },
    ClientStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
    },
    RegistrationDate: {
        type: Date,
        default: Date.now,
    },
    LastOrderDate: Date,
    TotalLifetimeValue: Number,
    PreferredPaymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Online Transfer', 'Other'],
    },
    AssignedSalesRepID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    TaxID: String,
    Website: String,
    IndustryType: String,
    CreditLimit: Number,
    OutstandingBalance: Number,
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const Client = mongoose.model('Client', clientSchema);





//* Clients Feedbacks
const clientsFeedbackSchema = new mongoose.Schema({
    FeedbackID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If FeedbackID should be unique
    },
    ClientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client model
    },
    FeedbackDate: {
        type: Date,
        default: Date.now,
    },
    FeedbackChannel: {
        type: String,
        enum: ['Email', 'Phone', 'Website', 'In-Person', 'Other'],
    },
    FeedbackCategory: {
        type: String,
        enum: ['Compliment', 'Complaint', 'Suggestion', 'Query', 'Other'],
    },
    FeedbackSubject: String,
    FeedbackDetail: String,
    FeedbackStatus: {
        type: String,
        enum: ['New', 'In Review', 'Addressed', 'Resolved', 'Closed'],
    },
    AssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ResolutionDate: Date,
    ResolutionDetail: String,
    ClientFollowUpDate: Date,
    ClientFollowUpNotes: String,
    FeedbackImpact: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    RelatedOrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    RelatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    Attachments: [String], // Array of attachment URLs
    FeedbackRating: {
        type: String,
        enum: ['1-5', '1-10', 'Other'], // You can adjust this enum as needed
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const ClientsFeedback = mongoose.model('ClientsFeedback', clientsFeedbackSchema);




//* Suppliers
const supplierSchema = new mongoose.Schema({
    SupplierID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If SupplierID should be unique
    },
    SupplierName: String,
    ContactFirstName: String,
    ContactLastName: String,
    ContactTitle: String,
    Email: String,
    PhoneNumber: String,
    AlternativePhoneNumber: String,
    FaxNumber: String,
    Address: String,
    City: String,
    State: String,
    Country: String,
    PostalCode: String,
    Website: String,
    SupplierType: {
        type: String,
        enum: ['Goods', 'Services', 'Both'],
    },
    SupplierStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Archived'],
    },
    RegistrationDate: {
        type: Date,
        default: Date.now,
    },
    LastOrderDate: Date,
    PaymentTerms: String,
    BankDetails: String,
    TaxID: String,
    PreferredCommunicationMethod: {
        type: String,
        enum: ['Email', 'Phone', 'Fax', 'Postal'],
    },
    ContractStartDate: Date,
    ContractEndDate: Date,
    AttachmentLinks: [String], // Array of attachment URLs
    AssignedAccountManagerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const Supplier = mongoose.model('Supplier', supplierSchema);





//* Supplier Products
const supplierProductSchema = new mongoose.Schema({
    SupplierProductID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If SupplierProductID should be unique
    },
    SupplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
    },
    PurchasePrice: Number,
    MinimumOrderQuantity: Number,
    LeadTime: Number,
    DiscountTerms: String,
    DiscountPercentage: Number,
    LastPurchasedDate: Date,
    LastPurchasedQuantity: Number,
    ContractualStatus: {
        type: String,
        enum: ['On Contract', 'Ad-hoc', 'Not Available'],
    },
    WarrantyPeriod: Number,
    ReturnPolicy: String,
    AvailabilityStatus: {
        type: String,
        enum: ['Available', 'Out of Stock', 'Discontinued'],
    },
    ExclusiveDeal: Boolean,
    AttachmentLinks: [String], // Array of attachment URLs
    ProductRating: {
        type: String,
        enum: ['1', '2', '3', '4', '5'], // Adjust as needed
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const SupplierProduct = mongoose.model('SupplierProduct', supplierProductSchema);





//* Supplier Ratings
const supplierRatingSchema = new mongoose.Schema({
    RatingID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If RatingID should be unique
    },
    SupplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Supplier model
    },
    RatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    RatingDate: {
        type: Date,
        default: Date.now,
    },
    ProductQualityScore: Number,
    DeliveryPunctualityScore: Number,
    PricingFairnessScore: Number,
    CommunicationScore: Number,
    SupportResponseScore: Number,
    OverallRating: Number,
    ReviewText: String,
    AttachmentsLinks: [String], // Array of attachment URLs
    RatingStatus: {
        type: String,
        enum: ['Draft', 'Finalized', 'Archived'],
    },
    FollowUpActionRequired: Boolean,
    ActionNotes: String,
    FollowUpActionStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Notes: String,
});

const SupplierRating = mongoose.model('SupplierRating', supplierRatingSchema);





//* Contacts
const contactSchema = new mongoose.Schema({
    ContractID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ContractID should be unique
    },
    ContractName: String,
    ContractType: {
        type: String,
        enum: ['Supplier', 'Client', 'Employee', 'Other'],
    },
    RelatedEntityID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    StartDate: Date,
    EndDate: Date,
    Duration: Number,
    Value: Number,
    PaymentTerms: String,
    ContractStatus: {
        type: String,
        enum: ['Active', 'Pending', 'Expired', 'Terminated', 'Draft'],
    },
    RenewalStatus: {
        type: String,
        enum: ['Auto-renewal', 'Manual', 'Not Renewable'],
    },
    TerminationConditions: String,
    SpecialClauses: String,
    DocumentLink: String,
    PrimaryContactID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    LastModified: Date,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Attachments: [String], // Array of attachment URLs
    ReviewDate: Date,
    SignatoryDetails: String,
    Notes: String,
});

const Contact = mongoose.model('Contact', contactSchema);





//* Messages
const messageSchema = new mongoose.Schema({
    MessageID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If MessageID should be unique
    },
    SenderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    RecipientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Subject: String,
    MessageBody: String,
    SentDateTime: {
        type: Date,
        default: Date.now,
    },
    ReadDateTime: Date,
    AttachmentLinks: [String], // Array of attachment URLs
    ThreadID: {
        type: String, // You can use Number for an integer or String for UUID
    },
    MessageType: {
        type: String,
        enum: ['Direct', 'System Notification', 'Group', 'Other'],
    },
    Priority: {
        type: String,
        enum: ['Normal', 'High', 'Urgent'],
    },
    Status: {
        type: String,
        enum: ['Unread', 'Read', 'Archived', 'Deleted'],
    },
    ReplyToMessageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Reference to the Message model
    },
    IsStarred: Boolean,
    Labels: [String], // Array of label names
    RecipientGroupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecipientGroup', // Reference to the RecipientGroup model
    },
    DeletedBySender: Boolean,
    DeletedByRecipient: Boolean,
    Notes: String,
});

const Message = mongoose.model('Message', messageSchema);




//* Notifications
const notificationSchema = new mongoose.Schema({
    NotificationID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If NotificationID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    NotificationType: {
        type: String,
        enum: ['System Alert', 'Reminder', 'Update', 'Task', 'Other'],
    },
    Title: String,
    Message: String,
    CreatedDateTime: {
        type: Date,
        default: Date.now,
    },
    ReadDateTime: Date,
    AssociatedLink: String,
    Priority: {
        type: String,
        enum: ['Normal', 'High', 'Critical'],
    },
    Status: {
        type: String,
        enum: ['Unread', 'Read', 'Archived', 'Dismissed'],
    },
    TriggerEvent: String,
    ExpirationDateTime: Date,
    Icon: String,
    ActionButtons: String, // You can use JSON if needed
    SourceModule: String,
    GroupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NotificationGroup', // Reference to the NotificationGroup model
    },
    Notes: String,
});

const Notification = mongoose.model('Notification', notificationSchema);





//* Social Media Posts
const socialMediaPostSchema = new mongoose.Schema({
    PostID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PostID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    Content: String,
    MediaLink: String,
    PostedDateTime: {
        type: Date,
        default: Date.now,
    },
    LastEditedDateTime: Date,
    LikesCount: Number,
    CommentsCount: Number,
    SharesCount: Number,
    Visibility: {
        type: String,
        enum: ['Public', 'Friends', 'Only Me', 'Custom'],
    },
    LocationTag: String,
    Hashtags: [String], // Array of hashtags
    MentionedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    ParentPostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    PostType: {
        type: String,
        enum: ['Text', 'Image', 'Video', 'Link', 'Other'],
    },
    URLs: [String], // Array of URL links
    SourcePlatform: {
        type: String,
        enum: ['Internal', 'Facebook', 'Twitter', 'Other'],
    },
    PinnedStatus: Boolean,
    ArchivedStatus: Boolean,
    ReportCount: Number,
    AssociatedEventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event model
    },
    Notes: String,
});

const SocialMediaPost = mongoose.model('SocialMediaPost', socialMediaPostSchema);





//* Social Media Comments
const socialMediaCommentSchema = new mongoose.Schema({
    CommentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If CommentID should be unique
    },
    PostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ParentCommentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaComment', // Reference to the SocialMediaComment model
    },
    Content: String,
    PostedDateTime: {
        type: Date,
        default: Date.now,
    },
    LastEditedDateTime: Date,
    LikesCount: Number,
    MentionedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
    MediaLink: String,
    Visibility: {
        type: String,
        enum: ['Public', 'Friends', 'Only Me'],
    },
    ReportCount: Number,
    Hashtags: [String], // Array of hashtags
    Status: {
        type: String,
        enum: ['Active', 'Deleted', 'Archived'],
    },
    URLs: [String], // Array of URL links
    Notes: String,
});

const SocialMediaComment = mongoose.model('SocialMediaComment', socialMediaCommentSchema);




//* Social Media Likes
const socialMediaLikeSchema = new mongoose.Schema({
    LikeID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If LikeID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    PostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaPost', // Reference to the SocialMediaPost model
    },
    CommentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMediaComment', // Reference to the SocialMediaComment model
    },
    LikedDateTime: {
        type: Date,
        default: Date.now,
    },
    LikeType: {
        type: String,
        enum: ['Like', 'Love', 'Laugh', 'Other'],
    },
    Status: {
        type: String,
        enum: ['Active', 'Removed'],
    },
    SourcePlatform: {
        type: String,
        enum: ['Internal', 'Facebook', 'Twitter', 'Other'],
    },
    Notes: String,
});

const SocialMediaLike = mongoose.model('SocialMediaLike', socialMediaLikeSchema);





//* Reports
const reportSchema = new mongoose.Schema({
    ReportID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ReportID should be unique
    },
    ReportName: String,
    ReportDescription: String,
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    CreatedDateTime: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ModifiedDateTime: Date,
    ReportType: {
        type: String,
        enum: ['Sales', 'Inventory', 'Marketing', 'Performance', 'Other'],
    },
    ReportStatus: {
        type: String,
        enum: ['Draft', 'Finalized', 'Archived'],
    },
    ReportPeriodStart: Date,
    ReportPeriodEnd: Date,
    DataSources: [String], // Array of data sources
    FileLink: String,
    Visibility: {
        type: String,
        enum: ['Public', 'Private', 'Restricted'],
    },
    ApprovalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    ApprovedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    ApprovalDateTime: Date,
    ReportTags: [String], // Array of report tags
    AssociatedProjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model
    },
    Notes: String,
});

const Report = mongoose.model('Report', reportSchema);






//* Chat Queries
const chatQuerySchema = new mongoose.Schema({
    QueryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If QueryID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    SessionID: String,
    QueryText: String,
    QueryDateTime: {
        type: Date,
        default: Date.now,
    },
    ResponseText: String,
    ResponseDateTime: Date,
    ResponseStatus: {
        type: String,
        enum: ['Successful', 'Failed', 'Pending'],
    },
    ResponseTime: Number,
    SourcePlatform: {
        type: String,
        enum: ['Web', 'Mobile', 'API'],
    },
    QueryContext: {
        type: mongoose.Schema.Types.Mixed, // Can store JSON or Text
    },
    ResponseError: String,
    QueryLanguage: String,
    ResponseLanguage: String,
    Tags: [String], // Array of tags
    UserFeedback: String,
    UserRating: Number,
    FollowUpAction: String,
    FollowUpStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
    },
    AssociatedTicketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket', // Reference to the Ticket model
    },
    Notes: String,
});

const ChatQuery = mongoose.model('ChatQuery', chatQuerySchema);






//* Billing Invoices
const billingInvoiceSchema = new mongoose.Schema({
    InvoiceID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If InvoiceID should be unique
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    InvoiceNumber: String,
    InvoiceDate: {
        type: Date,
        required: true,
    },
    DueDate: Date,
    BillingAddress: String,
    ShippingAddress: String,
    TotalAmount: Number,
    TaxAmount: Number,
    DiscountAmount: Number,
    SubTotal: Number,
    Currency: String,
    PaymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partial', 'Overdue'],
    },
    PaymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Other'],
    },
    InvoiceNotes: String,
    OrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    },
    InvoiceItems: {
        type: mongoose.Schema.Types.Mixed, // Can store JSON or reference to InvoiceItems table
    },
    CreatedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedDate: Date,
    TermsAndConditions: String,
    PenaltyRate: Number,
    PaidDate: Date,
    PaymentReference: String,
    BankDetails: String,
    Notes: String,
});

const BillingInvoice = mongoose.model('BillingInvoice', billingInvoiceSchema);






//* Payments
const paymentSchema = new mongoose.Schema({
    PaymentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PaymentID should be unique
    },
    InvoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingInvoice', // Reference to the BillingInvoice model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    PaymentDate: {
        type: Date,
        required: true,
    },
    PaymentAmount: Number,
    Currency: String,
    PaymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Other'],
    },
    PaymentReference: String,
    PaymentStatus: {
        type: String,
        enum: ['Completed', 'Failed', 'Pending', 'Refunded'],
    },
    PaymentNotes: String,
    BankName: String,
    CardType: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex', 'Other'],
    },
    CardLastFourDigits: String,
    PaymentGateway: String,
    GatewayTransactionID: String,
    IsRecurring: Boolean,
    NextPaymentDate: Date,
    PaymentFrequency: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Yearly', 'Other'],
    },
    FailureReason: String,
    RefundAmount: Number,
    RefundDate: Date,
    RefundReason: String,
    CreatedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedDate: Date,
    Notes: String,
});

const Payment = mongoose.model('Payment', paymentSchema);





//* Refunds
const refundSchema = new mongoose.Schema({
    RefundID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If RefundID should be unique
    },
    PaymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment', // Reference to the Payment model
    },
    InvoiceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingInvoice', // Reference to the BillingInvoice model
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    RefundDate: {
        type: Date,
        required: true,
    },
    RefundAmount: Number,
    Currency: String,
    RefundMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Original Payment Method', 'Other'],
    },
    RefundReference: String,
    RefundStatus: {
        type: String,
        enum: ['Completed', 'Failed', 'Pending'],
    },
    RefundReason: String,
    BankName: String, // Optional
    CardType: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex', 'Other'], // Optional
    },
    CardLastFourDigits: String, // Optional
    PaymentGateway: String,
    GatewayTransactionID: String,
    CreatedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedDate: Date,
    OriginalPaymentDate: Date,
    Notes: String,
});

const Refund = mongoose.model('Refund', refundSchema);






//* Expenses
const expenseSchema = new mongoose.Schema({
    ExpenseID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ExpenseID should be unique
    },
    DateIncurred: {
        type: Date,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    Currency: String,
    ExpenseCategory: {
        type: String,
        enum: ['Travel', 'Meals', 'Rent', 'Utilities', 'Other'], // Add more categories as needed
    },
    Description: String,
    Receipt: String, // You can store the file path or URL here
    PaymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Cheque', 'Other'],
    },
    Vendor: String,
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    ProjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model (optional)
    },
    IsReimbursable: Boolean,
    ReimbursementStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Reimbursed'],
    },
    ApprovalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    ApprovedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    ApprovalDate: Date,
    TaxAmount: Number,
    TaxRate: Number,
    ExpenseAccount: String, // You can use a string or reference an Accounting model if needed
    CreatedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedByEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    LastModifiedDate: Date,
    Notes: String,
});

const Expense = mongoose.model('Expense', expenseSchema);





//* Expense Categories
const expenseCategorySchema = new mongoose.Schema({
    CategoryID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If CategoryID should be unique
    },
    CategoryName: {
        type: String,
        required: true,
    },
    Description: String,
    ParentCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory', // Reference to the same model (self-referential)
    },
    DefaultTaxRate: Number,
    IsActive: Boolean,
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    Icon: String, // Optional
    BudgetLimit: Number, // Optional
    ColorCode: String, // Optional
    Notes: String, // Optional
});

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);






//* Asset Management
const assetSchema = new mongoose.Schema({
    AssetID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If AssetID should be unique
    },
    AssetName: {
        type: String,
        required: true,
    },
    Description: String,
    AssetType: {
        type: String,
        enum: ['Tangible', 'Intangible', 'Software', 'Hardware', 'Other'], // Add more asset types as needed
    },
    PurchaseDate: {
        type: Date,
        required: true,
    },
    PurchasePrice: {
        type: Number,
        required: true,
    },
    Currency: String,
    SupplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the Suppliers model
    },
    WarrantyExpiryDate: Date, // Optional
    DepreciationMethod: String, // Optional
    ResidualValue: Number, // Optional
    UsefulLife: Number, // Optional
    Location: String,
    AssignedToEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    MaintenanceSchedule: String, // Optional
    LastMaintenanceDate: Date, // Optional
    AssetStatus: {
        type: String,
        enum: ['Operational', 'Out for Repair', 'Decommissioned', 'Other'], // Add more statuses as needed
    },
    DisposalDate: Date, // Optional
    DisposalValue: Number, // Optional
    DisposalReason: String, // Optional
    SerialNumber: String, // Optional
    Manufacturer: String,
    Model: String,
    Image: String, // File URL or base64 encoded string, optional
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    Notes: String, // Optional
});

const Asset = mongoose.model('Asset', assetSchema);





//* Vehicle Management
const vehicleSchema = new mongoose.Schema({
    VehicleID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If VehicleID should be unique
    },
    LicensePlate: {
        type: String,
        required: true,
    },
    VehicleType: {
        type: String,
        enum: ['Car', 'Truck', 'Motorcycle', 'Van', 'Other'], // Add more vehicle types as needed
        required: true,
    },
    Make: String,
    Model: String,
    Year: Number,
    Color: String,
    VIN: String,
    PurchaseDate: Date,
    PurchasePrice: Number,
    OdometerReadingAtPurchase: Number,
    CurrentOdometerReading: Number,
    LastServiceDate: Date,
    NextServiceDue: Date,
    FuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'], // Add more fuel types as needed
    },
    InsuranceProvider: String,
    InsurancePolicyNumber: String,
    InsuranceExpiryDate: Date,
    AssignedToEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    Location: String,
    VehicleStatus: {
        type: String,
        enum: ['Operational', 'Out for Repair', 'Retired', 'Other'], // Add more statuses as needed
        required: true,
    },
    Image: String, // File URL or base64 encoded string, optional
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    TireType: String, // Optional
    TireChangeDate: Date, // Optional
    GPSModuleID: String, // Optional
    Notes: String, // Optional
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);





//* Logistics
const logisticsSchema = new mongoose.Schema({
    LogisticID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If LogisticID should be unique
    },
    OrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Orders model
    },
    VehicleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle', // Reference to the Vehicle Management model
    },
    DepartureLocation: String,
    DestinationLocation: String,
    ScheduledDeparture: Date,
    ActualDeparture: Date,
    ScheduledArrival: Date,
    ActualArrival: Date, // Optional
    CurrentStatus: {
        type: String,
        enum: ['Scheduled', 'In Transit', 'Delayed', 'Completed', 'Other'], // Add more statuses as needed
        required: true,
    },
    DriverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails', // Reference to the EmployeeDetails model
    },
    Weight: Number,
    Volume: Number,
    NumberOfItems: Number,
    TransportMode: {
        type: String,
        enum: ['Road', 'Air', 'Sea', 'Rail', 'Other'], // Add more transport modes as needed
    },
    CarrierName: String,
    CarrierTrackingNumber: String,
    LogisticCost: Number,
    TemperatureRequired: Number, // Optional
    CurrentTemperature: Number, // Optional
    HumidityLevel: Number, // Optional
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    IncidentReport: String, // Optional
    SignatureOfReceiver: String, // File URL or base64 encoded string, optional
    ReceivedDate: Date, // Optional
    Notes: String, // Optional
});

const Logistics = mongoose.model('Logistics', logisticsSchema);




//* Warehouse Locations
const warehouseLocationSchema = new mongoose.Schema({
    LocationID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If LocationID should be unique
    },
    WarehouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse', // Reference to the Warehouse model
        required: true,
    },
    LocationCode: String,
    ShelfNumber: Number,
    RowNumber: Number,
    TierNumber: Number,
    BinNumber: String, // Optional
    Capacity: Number,
    CurrentOccupancy: Number,
    OccupancyType: {
        type: String,
        enum: ['Volume', 'Weight', 'Units'],
    },
    TemperatureZone: {
        type: String,
        enum: ['Frozen', 'Chilled', 'Ambient', 'Heated', 'Other'], // Add more zones as needed
    },
    HumidityControl: Boolean,
    SpecialAttributes: String, // Optional
    Accessibility: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    IsOccupied: Boolean,
    AssociatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model (optional)
    },
    AssociatedInventoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Reference to the Inventory model (optional)
    },
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    Notes: String, // Optional
});

const WarehouseLocation = mongoose.model('WarehouseLocation', warehouseLocationSchema);






//* Marketing Campaigns
const marketingCampaignSchema = new mongoose.Schema({
    CampaignID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If CampaignID should be unique
    },
    CampaignName: String,
    CampaignType: {
        type: String,
        enum: ['Digital', 'Print', 'Event', 'TV', 'Radio', 'Other'], // Add more types as needed
    },
    StartDate: Date,
    EndDate: Date,
    Budget: Number,
    SpentAmount: Number,
    TargetAudience: String,
    TargetRegion: String,
    ExpectedReach: Number,
    ActualReach: Number,
    ExpectedConversions: Number,
    ActualConversions: Number,
    KPIs: String,
    ChannelDetails: String,
    CampaignDescription: String,
    CampaignStatus: {
        type: String,
        enum: ['Planned', 'Ongoing', 'Completed', 'Paused', 'Cancelled'],
    },
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    AssetsURL: String, // Optional
    Feedback: String, // Optional
    ROI: Number, // Optional
    Notes: String, // Optional
});

const MarketingCampaign = mongoose.model('MarketingCampaign', marketingCampaignSchema);






//* Marketing Analytics
const marketingAnalyticsSchema = new mongoose.Schema({
    AnalyticsID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If AnalyticsID should be unique
    },
    CampaignID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MarketingCampaign', // Reference to the MarketingCampaign model
        required: true,
    },
    Date: Date,
    PageViews: Number,
    Clicks: Number,
    Impressions: Number,
    Conversions: Number,
    BounceRate: Number,
    AverageSessionDuration: String, // Consider using a proper time format
    CostPerClick: Number,
    CostPerConversion: Number,
    TrafficSource: String,
    DeviceType: {
        type: String,
        enum: ['Mobile', 'Desktop', 'Tablet', 'Other'], // Add more types as needed
    },
    Location: String,
    NewVisitors: Number,
    ReturningVisitors: Number,
    ExitRate: Number,
    TopKeywords: String,
    ReferralURL: String, // Optional
    SocialShares: Number,
    CTR: Number,
    FeedbackRating: Number, // Optional
    CommentsCount: Number,
    EngagementRate: Number,
    RevenueGenerated: Number,
    AdPosition: {
        type: String,
        enum: ['Top', 'Right', 'Bottom', 'Other'], // Add more positions as needed
    },
    AdFormat: {
        type: String,
        enum: ['Text', 'Image', 'Video', 'Other'], // Add more formats as needed
    },
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    Notes: String, // Optional
});

const MarketingAnalytics = mongoose.model('MarketingAnalytics', marketingAnalyticsSchema);





//* Partnerships
const partnershipSchema = new mongoose.Schema({
    PartnershipID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PartnershipID should be unique
    },
    PartnerName: String,
    PartnershipType: {
        type: String,
        enum: ['Affiliate', 'Distributor', 'Collaborator', 'Other'], // Add more types as needed
    },
    StartDate: Date,
    EndDate: Date, // Optional
    Status: {
        type: String,
        enum: ['Active', 'Pending', 'Terminated', 'Other'], // Add more statuses as needed
    },
    ContractID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract', // Reference to the Contracts model
    },
    PrimaryContactName: String,
    PrimaryContactEmail: String,
    PrimaryContactPhone: String,
    RevenueShare: Number,
    AnnualReviewDate: Date,
    LogoURL: String, // Optional
    WebsiteURL: String, // Optional
    Address: String,
    City: String,
    State: String,
    Country: String,
    PostalCode: String,
    PartnershipBenefits: String, // Optional
    PartnershipObjectives: String,
    PerformanceMetrics: String, // Optional
    RenewalTerms: String, // Optional
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    Notes: String, // Optional
});

const Partnership = mongoose.model('Partnership', partnershipSchema);






//* Events And Promotions
const eventPromoSchema = new mongoose.Schema({
    EventPromoID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If EventPromoID should be unique
    },
    EventPromoName: String,
    EventType: {
        type: String,
        enum: ['Event', 'Promotion', 'Launch', 'Other'], // Add more event types as needed
    },
    StartDate: Date,
    EndDate: Date,
    Location: String, // Optional
    Description: String,
    URL: String, // Optional
    Status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Other'], // Add more statuses as needed
    },
    TargetAudience: String, // Optional
    MaxAttendees: Number, // Optional
    Cost: Number,
    DiscountPercentage: Number, // Optional
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Products model (optional)
    },
    PromoCode: String, // Optional
    RSVPLink: String, // Optional
    ImageURL: String, // Optional
    OrganizerContactName: String,
    OrganizerContactEmail: String,
    OrganizerContactPhone: String,
    Sponsor: String, // Optional
    ExpectedRevenue: Number, // Optional
    ActualRevenue: Number, // Optional
    FeedbackLink: String, // Optional
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    ModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ModifiedDate: Date, // Optional
    Notes: String, // Optional
});

const EventPromo = mongoose.model('EventPromo', eventPromoSchema);





//* Support Tickets
const supportTicketSchema = new mongoose.Schema({
    TicketID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If TicketID should be unique
    },
    Subject: String,
    Description: String,
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    Priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
    },
    Status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed', 'Reopened'],
    },
    AssignedToUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    Category: String, // You can create a separate "Category" model and use a reference if needed
    OpenDate: {
        type: Date,
        default: Date.now,
    },
    CloseDate: Date, // Optional
    ExpectedResolutionDate: Date, // Optional
    ActualResolutionDate: Date, // Optional
    Resolution: String, // Optional
    RelatedProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Products model (optional)
    },
    Attachments: [String], // An array of file URLs or paths
    Feedback: String, // Optional
    FeedbackComments: String, // Optional
    FollowUpRequired: Boolean,
    FollowUpDate: Date, // Optional
    LastUpdatedDate: {
        type: Date,
        default: Date.now,
    },
    LastUpdatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
    },
    InternalNotes: String, // Optional
    Origin: {
        type: String,
        enum: ['Email', 'Web', 'Phone', 'Chat', 'Other'], // Add more origin types as needed
    },
    RelatedOrderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Orders model (optional)
    },
    EscalationLevel: Number, // Optional
    TimeToFirstResponse: String, // Optional (can be Time or Duration)
    TimeToResolution: String, // Optional (can be Time or Duration)
    Notes: String, // Optional
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);






//* Ticket Comments
const ticketCommentSchema = new mongoose.Schema({
    CommentID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If CommentID should be unique
    },
    TicketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupportTicket', // Reference to the SupportTicket model
        required: true,
    },
    CommentText: String,
    CommentedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    CommentDate: {
        type: Date,
        default: Date.now,
    },
    Attachment: [String], // Array of file URLs or paths (optional)
    CommentType: {
        type: String,
        enum: ['User', 'Agent', 'System', 'Other'],
    },
    IsInternal: Boolean,
    IsEdited: Boolean,
    EditedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    EditDate: Date, // Optional
    RelatedToAction: {
        type: String,
        enum: ['Status Change', 'Resolution Update', 'Escalation', 'Other'],
    },
    PreviousValue: String, // Optional
    NewValue: String, // Optional
    CommentMood: {
        type: String,
        enum: ['Neutral', 'Positive', 'Negative', 'Other'],
    },
    Notes: String, // Optional
});

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);






//* Shift Schedules
const shiftScheduleSchema = new mongoose.Schema({
    ShiftID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If ShiftID should be unique
    },
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model
        required: true,
    },
    StartDate: {
        type: Date,
        required: true,
    },
    EndDate: {
        type: Date,
        required: true,
    },
    ShiftType: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night', 'Other'],
        required: true,
    },
    RoleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Roles model (optional)
    },
    LocationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Reference to Warehouse Locations or Office Locations model (optional)
    },
    ShiftStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Other'],
        required: true,
    },
    BreakStartTime: Date, // Optional
    BreakEndTime: Date, // Optional
    TotalHours: {
        type: Number,
        required: true,
    },
    OvertimeHours: {
        type: Number,
        default: 0,
    },
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    CreationDate: {
        type: Date,
        default: Date.now,
    },
    LastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    LastModifiedDate: Date, // Optional
    SwapRequestStatus: {
        type: String,
        enum: ['Requested', 'Approved', 'Denied', 'NotRequested', 'Other'],
    },
    RequestedSwapWithEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model (optional)
    },
    SwapApprovalByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    Notes: String, // Optional
});

const ShiftSchedule = mongoose.model('ShiftSchedule', shiftScheduleSchema);






//* Vacation Requests
const vacationRequestSchema = new mongoose.Schema({
    RequestID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If RequestID should be unique
    },
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model
        required: true,
    },
    StartDate: {
        type: Date,
        required: true,
    },
    EndDate: {
        type: Date,
        required: true,
    },
    TotalDaysRequested: {
        type: Number,
        required: true,
    },
    RequestDate: {
        type: Date,
        required: true,
    },
    RequestStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied', 'Cancelled', 'Other'],
        required: true,
    },
    ReasonForVacation: String, // Optional
    ManagerNotes: String, // Optional
    ApprovedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ApprovalDate: Date, // Optional
    IsPaidLeave: Boolean,
    VacationType: {
        type: String,
        enum: ['Annual Leave', 'Sick Leave', 'Personal Day', 'Maternity/Paternity', 'Other'],
    },
    AttachedDocuments: String, // File or URL (optional)
    EmergencyContactName: String, // Optional
    EmergencyContactNumber: String, // Optional
    RequestedCoverageEmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetail', // Reference to the Employee Detail model (optional)
    },
    CoverageStatus: {
        type: String,
        enum: ['NotNeeded', 'Requested', 'Approved', 'Denied', 'Other'],
    },
    ReturnDate: Date,
    ActualReturnDate: Date, // Optional
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    LastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    LastModifiedDate: Date, // Optional
    Notes: String, // Optional
});

const VacationRequest = mongoose.model('VacationRequest', vacationRequestSchema);






//* HR Policies
const hrPolicySchema = new mongoose.Schema({
    PolicyID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If PolicyID should be unique
    },
    PolicyTitle: {
        type: String,
        required: true,
    },
    PolicyCategory: {
        type: String,
        enum: ['Attendance', 'Benefits', 'Conduct', 'Equal Opportunity', 'Other'],
        required: true,
    },
    PolicyVersion: {
        type: String,
        required: true,
    },
    EffectiveDate: {
        type: Date,
        required: true,
    },
    EndDate: Date, // Optional
    PolicySummary: String,
    PolicyDetail: String, // Text or LongText
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    LastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    LastModifiedDate: Date, // Optional
    ApprovalStatus: {
        type: String,
        enum: ['Draft', 'Pending', 'Approved', 'Archived', 'Other'],
        required: true,
    },
    ApprovedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ApprovalDate: Date, // Optional
    RelatedDocuments: String, // File or URL (optional)
    AssociatedDepartment: String, // Optional
    RevisionNotes: String, // Optional
    FeedbackChannel: String, // Text or URL (optional)
    ReviewFrequency: {
        type: String,
        enum: ['Annually', 'Bi-Annually', 'Quarterly', 'Other'],
    },
    NextReviewDate: Date, // Optional
    PolicyAcknowledgedBy: String, // Text (optional)
    Notes: String, // Optional
});

const HrPolicy = mongoose.model('HrPolicy', hrPolicySchema);





//* Company Goals
const companyGoalSchema = new mongoose.Schema({
    GoalID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If GoalID should be unique
    },
    GoalTitle: {
        type: String,
        required: true,
    },
    GoalDescription: String,
    StartDate: {
        type: Date,
        required: true,
    },
    TargetEndDate: {
        type: Date,
        required: true,
    },
    ActualEndDate: Date, // Optional
    GoalStatus: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Archived', 'Other'],
        required: true,
    },
    GoalCategory: {
        type: String,
        enum: ['Financial', 'Operational', 'Strategic', 'HR', 'Marketing', 'Other'],
    },
    Priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    AssignedToDepartment: String, // Optional
    AssignedToUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    ProgressPercentage: Number,
    KPIs: String, // Text (optional)
    Dependencies: String, // Text (optional)
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    LastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    LastModifiedDate: Date, // Optional
    ResourcesAllocated: String, // Text (optional)
    Milestones: String, // Text (optional)
    Challenges: String, // Text (optional)
    Attachments: String, // File or URL (optional)
    Outcome: String, // Text (optional)
    Feedback: String, // Text (optional)
    Notes: String, // Text (optional)
});

const CompanyGoal = mongoose.model('CompanyGoal', companyGoalSchema);






//* Industry Trends
const industryTrendSchema = new mongoose.Schema({
    TrendID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If TrendID should be unique
    },
    TrendName: {
        type: String,
        required: true,
    },
    TrendDescription: String,
    StartDate: {
        type: Date,
        required: true,
    },
    PeakDate: Date, // Optional
    TrendStatus: {
        type: String,
        enum: ['Emerging', 'Peaking', 'Declining', 'Stable', 'Other'],
        required: true,
    },
    TrendType: {
        type: String,
        enum: ['Product', 'Consumer Behavior', 'Technology', 'Regulation', 'Other'],
        required: true,
    },
    TrendImpact: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    RegionsAffected: String, // Optional
    AssociatedBrands: String, // Text (optional)
    ResearchSource: String,
    LinkToSource: String, // URL (optional)
    AdditionalSources: String, // Text (optional)
    TrendForecast: String,
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    LastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    LastModifiedDate: Date, // Optional
    RelatedIndustries: String, // Text (optional)
    Visuals: String, // File or URL (optional)
    TrendRating: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
    },
    RelatedTrends: String, // Text (optional)
    Opportunities: String, // Text (optional)
    Challenges: String, // Text (optional)
    KeyPlayers: String, // Text (optional)
    Notes: String, // Text (optional)
});

const IndustryTrend = mongoose.model('IndustryTrend', industryTrendSchema);





//* Competitor Analysis
const competitorAnalysisSchema = new mongoose.Schema({
    AnalysisID: {
        type: String, // You can use Number for an integer or String for UUID
        required: true,
        unique: true, // If AnalysisID should be unique
    },
    CompetitorName: {
        type: String,
        required: true,
    },
    CompetitorURL: String, // URL (optional)
    AnalysisDate: {
        type: Date,
        required: true,
    },
    SWOT_Strengths: String,
    SWOT_Weaknesses: String,
    SWOT_Opportunities: String,
    SWOT_Threats: String,
    MarketShare: String,
    KeyProducts: String,
    ProductPricing: String,
    SalesStrategy: String,
    MarketingStrategy: String,
    OperationalStrengths: String,
    FinancialHealth: String,
    KeyPartnerships: String,
    KeyLocations: String,
    DigitalPresenceRating: String,
    CustomerFeedback: String,
    InnovativeFeatures: String,
    TargetAudience: String,
    CreatedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model
        required: true,
    },
    LastModifiedByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Users model (optional)
    },
    LastModifiedDate: Date, // Optional
    FuturePredictions: String,
    Visuals: String, // File or URL (optional)
    DataSources: String,
    Notes: String, // Text (optional)
});

const CompetitorAnalysis = mongoose.model('CompetitorAnalysis', competitorAnalysisSchema);









app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});