const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

// Initialize dotenv to load environment variables
dotenv.config({ path: './.env' });

// Create an Express app
const app = express();

// Set up the database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Connect to the database
db.connect((error) => {
    if (error) {
        console.log("Error connecting to MySQL:", error);
    } else {
        console.log("MySQL connected!");
    }
});

// Export db so other files can access it
module.exports = { db };

// Setup Handlebars view engine
app.set('view engine', 'hbs');

const hbs = require('hbs');

// Register a custom 'eq' helper for comparison
hbs.registerHelper('eq', function (a, b) {
    return a === b; // Checks if a is equal to b
});

// Configure the public directory for static assets (CSS, JS)
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

// Set the views directory for Handlebars templates
app.set('views', path.join(__dirname, 'views'));

// Middleware to handle sessions globally
app.use(session({
    secret: 'yourSecretKey', // Choose a strong key for production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if you're using HTTPS
}));

// Middleware
const bcrypt = require("bcryptjs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);


// Set the port and start listening for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
