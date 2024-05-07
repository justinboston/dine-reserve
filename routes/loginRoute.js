const express = require('express');
const router = express.Router();

// GET request for the login page
router.get('/', (req, res) => {
    res.render('login', { logged_in: false });
});

// POST request for handling login form submission
router.post('/', (req, res) => {
    // Handle login logic here
    // Example: validate credentials, authenticate user, set session, etc.
    res.send('Login logic will be handled here');
});

module.exports = router;
