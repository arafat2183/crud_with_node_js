const bcrypt = require("bcryptjs");
// const userModel = require('../user/models/userModel');

exports.homePage = (req, res) => {
    res.render("index");
};

exports.loginPage = (req, res) => {
    res.render("login");
};

exports.registerPage = (req, res) => {
    res.render("register");
};

// Add logic to handle login, registration, etc. here
