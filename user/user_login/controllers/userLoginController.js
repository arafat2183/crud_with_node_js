// authLoginController.js

const bcrypt = require("bcryptjs");
const { db } = require('../../../app'); // Ensure the path is correct

// Handle login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).send("Please fill in both email and password.");
    }

    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Database error.");
        }

        if (results.length === 0) {
            return res.status(400).send("User not found.");
        }

        const user = results[0];

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Incorrect password.");
        }

        // If password matches, store the user information in the session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        // Redirect to a protected page (e.g., user dashboard)
        // res.render('../user/user_login/view/logged_in_dashboard', { user: user });
        res.redirect('/auth/login');
    });
};

// Logout handler
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out.");
        }

        res.redirect('/login');  // Redirect to login after logout
    });
};
