const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
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

// Setup Handlebars view engine
app.set('view engine', 'hbs');

// Configure the public directory for static assets (CSS, JS)
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

// Set the views directory for Handlebars templates
app.set('views', path.join(__dirname, 'views'));

// Basic route to check if the server is running
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// Route for homepage, rendering the 'index.hbs' template
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// Set the port and start listening for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
