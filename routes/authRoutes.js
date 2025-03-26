const express = require('express');
const router = express.Router();

const authController = require('../user/controllers/authController');
const authLoginController = require('../user/user_login/controllers/userLoginController');
const userRegisterController = require('../user/user_register/controllers/userRegisterController');

// Routes
router.get("/", authController.homePage);
router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

// Handle login and registration (POST requests)
router.post("/auth/register", userRegisterController.userRegister);  // Registration logic
router.post("/auth/login", authLoginController.login);  // Login logic (POST request)
router.get("/auth/login", authController.loginPage);  // Login logic (POST request)

// Handle logout
router.get("/auth/logout", authLoginController.logout);

module.exports = router;
