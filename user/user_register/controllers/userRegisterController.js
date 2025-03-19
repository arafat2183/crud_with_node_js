const bcrypt = require("bcryptjs");
// Import the db object from app.js
const { db } = require('../../../app'); // Going up two levels to reach the root

exports.userRegister = (req, res) => {
    const { name, email, password, passwordConfirm, remarks } = req.body;

    // Check if 'remarks' exists and set it, otherwise skip it
    const remarksValue = remarks || null;  // If remarks exists, it will be set, otherwise it'll be null.

    // Example validation
    if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).send("Please fill all the required field.");
    }

    if (password !== passwordConfirm) {
        return res.status(400).send("Passwords do not match.");
    }

    // Check if the email already exists in the database
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Database error: " + error.message);
        }

        // If the email is already taken, send an error response
        if (results.length > 0) {
            return res.status(400).send("Email is already in use.");
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        db.query('INSERT INTO users (name, email, password, remarks) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, remarksValue], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error creating user: " + err.message);
            }

            // Successfully created the user, now render the confirmation page
            res.render('../user/user_register/view/user_create_confirmation', {
                name: name,
                email: email,
                password: password, // Make sure you never display passwords in production!
                passwordConfirm: passwordConfirm
            });
        });
    });
};

exports.loginPage = (req, res) => {
    res.render("login");
};

exports.registerPage = (req, res) => {
    res.render("register");
};
