const bcrypt = require("bcryptjs");
// const userModel = require('../user/models/userModel');

exports.homePage = (req, res) => {
    res.render("index", {
        isHome: true // Indicates that the Home link should be active
    });
};

// Render the login page with session check
exports.loginPage = (req, res) => {
    if (req.session.user) {
        // Redirect to a protected page (e.g., user dashboard)
        res.render('../user/user_login/view/logged_in_dashboard', { user: req.session.user, isLogin: true});
    } else {
        // If session doesn't exist, render the login page
        res.render('login', {
            isLogin: true, // Indicates that the Login link should be active
        });  // This will render login.hbs from the views folder
    }
};

exports.registerPage = (req, res) => {
    res.render("register", {
        isRegister: true, // Indicates that the Register link should be active
    });
};

// Add logic to handle login, registration, etc. here
