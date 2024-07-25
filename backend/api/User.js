const express = require('express');
const router = express.Router();

const User = require('backend/api/User.js'); // Ensure this path is correct
const bcrypt = require('bcrypt'); // Corrected import

// Registration endpoint
router.post('/registration', async (req, res) => {
    let { username, password, confirmPassword } = req.body;
    username = username.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Check if any fields are empty
    if (username === "" || password === "" || confirmPassword === "") {
        return res.json({
            status: "FAILED",
            message: "Empty Input Fields!"
        });
    }

    // Check if username is valid
    else if (!/^[a-zA-Z]*$/.test(username)) {
        return res.json({
            status: "FAILED",
            message: "Invalid username entered"
        });
    }

    // Check if password meets length requirement
    else if (password.length < 8) {
        return res.json({
            status: "FAILED",
            message: "Password must be at least 8 characters long"
        });
    }

    // Check if passwords match
    else if (password !== confirmPassword) {
        return res.json({
            status: "FAILED",
            message: "Passwords do not match"
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.json({
                status: "FAILED",
                message: "User already exists"
            });
        }

        // Handle password hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        // Save the new user to the database
        const result = await newUser.save();

        // If registration is successful
        res.json({
            status: "SUCCESS",
            message: "User Registered Successfully!",
            data: result
        });

    } catch (err) {
        console.error(err);
        res.json({
            status: "FAILED",
            message: "An error occurred while registering the user"
        });
    }
});

module.exports = router;
