const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Function to find user by email
exports.findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Function to create a new user
exports.createUser = (userData, callback) => {
    db.query('INSERT INTO users SET ?', userData, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};
