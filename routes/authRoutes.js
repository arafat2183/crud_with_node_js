const express = require('express');
const router = express.Router();

// Import the controller
const authController = require('../user/controllers/authController');
const userRegisterController = require('../user/user_register/controllers/userRegisterController');

// Routes
router.get("/", authController.homePage);
router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

router.post("/auth/register", userRegisterController.userRegister);



module.exports = router;
