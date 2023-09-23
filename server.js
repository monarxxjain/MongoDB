const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});



//* Users
const User = require('./models/user');

//* Roles
const Role = require('./models/role');

//* Permissions
const Permission = require('./models/permission');

//* Employee Details
const EmployeeDetail = require('./models/employeeDetail');

//* Employee Training
const EmployeeTraining = require('./models/employeeTraining');

//* Employee Performance
const EmployeePerformance = require('./models/employeePerformance');

//* Employee Attendance
const EmployeeAttendance = require('./models/employeeAttendance');

//* Inventory
const Inventory = require('./models/inventory');

//* Products
const Product = require('./models/product');

//* Product Categories
const ProductCategory = require('./models/productCategory');

//* Product Reviews
const ProductReview = require('./models/productReview');

//* Sales
const Sale = require('./models/sale');

//* Sales Target
const SalesTarget = require('./models/salesTarget');

//* Orders
const Order = require('./models/order');

//* Order Details
const OrderDetails = require('./models/orderDetail');

//* Clients
const Client = require('./models/client');

//* Clients Feedbacks
const ClientFeedback = require('./models/clientFeedback');

//* Suppliers
const Supplier = require('./models/supplier');

//* Supplier Products
const SupplierProducts = require('./models/supplierProduct');

//* Supplier Ratings
const SupplierRating = require('./models/supplierRating');

//* Contacts
const Contacts = require('./models/contact');

//* Messages
const Messages = require('./models/message');

//* Notifications
const Notifications = require('./models/notification');

//* Social Media Posts
const SocialMediaPost = require('./models/socialMediaPost');

//* Social Media Comments
const SocialMediaComment = require('./models/socialMediaComment');

//* Social Media Likes
const SocialMediaLink = require('./models/socialMediaLink');

//* Reports
const Reports = require('./models/report');

//* Chat Queries
const ChatQueries = require('./models/chatQuery');

//* Billing Invoices
const BillingInvoices = require('./models/billingInvoices');

//* Payments
const Payments = require('./models/payment');

//* Refunds
const Refunds = require('./models/refund');

//* Expenses
const Expense = require('./models/expense');

//* Expense Categories
const ExpenseCategory = require('./models/expenseCategory');

//* Asset Management
const Asset = require('./models/asset');

//* Vehicle Management
const Vehicle = require('./models/vehicle');

//* Logistics
const Logistics = require('./models/logistics');

//* Warehouse Locations
const WarehouseLocation = require('./models/warehouseLocation');

//* Marketing Campaigns
const MarketingCampaigns = require('./models/marketingCampaigns');

//* Marketing Analytics
const MarketingAnalytics = require('./models/marketingAnalytics');

//* Partnerships
const Partnership = require('./models/partnership');

//* Events And Promotions
const EventPromo = require('./models/eventPromo');

//* Support Tickets
const SupportTicket = require('./models/supportTicket');

//* Ticket Comments
const TicketComment = require('./models/ticketComment');

//* Shift Schedules
const ShiftSchedule = require('./models/shiftSchedule');

//* Vacation Requests
const VacationRequest = require('./models/vacationRequest');

//* HR Policies
const HrPolicy = require('./models/hrPolicy');

//* Company Goals
const CompanyGoal = require('./models/companyGoal');

//* Industry Trends
const IndustryTrend = require('./models/industryTrends');

//* Competitor Analysis
const CompetitorAnalysis = require('./models/competitorAnalysis');



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});