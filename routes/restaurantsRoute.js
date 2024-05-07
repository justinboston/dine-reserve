const express = require('express');
const router = express.Router();

// Mock data for restaurants (replace with data from your database)
const restaurantsData = [
    { name: 'The Gourmet Place', type: 'Fine Dining', address: '123 Main St', image: 'image_url1.jpg' },
    { name: 'Quick Bites', type: 'Fast Food', address: '456 Elm St', image: 'image_url2.jpg' },
    { name: 'Sushi World', type: 'Japanese', address: '789 Pine St', image: 'image_url3.jpg' },
    { name: 'Pasta House', type: 'Italian', address: '321 Maple St', image: 'image_url4.jpg' },
    { name: 'Café Delight', type: 'Café', address: '654 Oak St', image: 'image_url5.jpg' }
];

// GET request for the restaurants page
router.get('/', (req, res) => {
    res.render('restaurants', { logged_in: false, restaurants: restaurantsData });
});

module.exports = router;
