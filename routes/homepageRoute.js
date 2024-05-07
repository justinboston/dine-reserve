const express = require('express');
const router = express.Router();

// GET request for the homepage
router.get('/', (req, res) => {
    res.render('homepage', { logged_in: false });
});

module.exports = router;
