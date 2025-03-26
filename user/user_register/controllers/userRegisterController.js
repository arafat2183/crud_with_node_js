const bcrypt = require("bcryptjs");
const { db } = require('../../../app'); // Adjust the path if needed

exports.userRegister = (req, res) => {
    const { name, email, password, passwordConfirm, remarks } = req.body;

    // Check if 'remarks' exists and set it, otherwise skip it
    const remarksValue = remarks || null;

    // Example validation
    if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).render('../user/user_register/view/user_create_confirmation', {
            status: 'error',
            message: "Please fill all the required fields."
        });
    }

    if (password !== passwordConfirm) {
        return res.status(400).render('../user/user_register/view/user_create_confirmation', {
            status: 'error',
            message: "Passwords do not match."
        });
    }

    // Check if the email already exists in the database
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).render('../user/user_register/view/user_create_confirmation', {
                status: 'error',
                message: "Database error: " + error.message
            });
        }

        // If the email is already taken, send an error response
        if (results.length > 0) {
            return res.status(400).render('../user/user_register/view/user_create_confirmation', {
                status: 'error',
                message: "Email is already in use."
            });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        db.query('INSERT INTO users (name, email, password, remarks) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, remarksValue], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).render('../user/user_register/view/user_create_confirmation', {
                    status: 'error',
                    message: "Error creating user: " + err.message
                });
            }

            // Successfully created the user
            res.render('../user/user_register/view/user_create_confirmation', {
                status: 'success',
                message: "User created successfully!",
                name: name,
                email: email
            });
        });
    });
};
