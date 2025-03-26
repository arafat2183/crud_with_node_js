const bcrypt = require("bcryptjs");
// const userModel = require('../user/models/userModel');

exports.homePage = (req, res) => {
    res.render("index");
};

// Render the login page with session check
exports.loginPage = (req, res) => {
    if (req.session.user) {
        // Redirect to a protected page (e.g., user dashboard)
        res.render('../user/user_login/view/logged_in_dashboard', { user: req.session.user });
    } else {
        // If session doesn't exist, render the login page
        res.render('login');  // This will render login.hbs from the views folder
    }
};

exports.registerPage = (req, res) => {
    res.render("register");
};

// Add logic to handle login, registration, etc. here
