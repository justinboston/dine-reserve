const { User, Restaurant, Reservation } = require('../models'); // Ensure path is correct
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

async function seedRestaurants() {
    await sequelize.sync({ force: true }); // Drop and recreate tables

    const users = await User.bulkCreate([
        { username: 'johndoe', email: 'john@example.com', password: bcrypt.hashSync('password123', 10) },
        { username: 'janedoe', email: 'jane@example.com', password: bcrypt.hashSync('password456', 10) },
    ], { returning: true });

    const restaurants = await Restaurant.bulkCreate([
        { name: 'The Gourmet Place', type: 'Fine Dining', address: '123 Main St', image: 'image_url1.jpg' },
        { name: 'Quick Bites', type: 'Fast Food', address: '456 Elm St', image: 'image_url2.jpg' },
        { name: 'Sushi World', type: 'Japanese', address: '789 Pine St', image: 'image_url3.jpg' },
        { name: 'Pasta House', type: 'Italian', address: '321 Maple St', image: 'image_url4.jpg' },
        { name: 'Café Delight', type: 'Café', address: '654 Oak St', image: 'image_url5.jpg' },
    ], { returning: true });

    await Reservation.bulkCreate([
        { date: new Date('2024-05-01'), time: '19:00', guests: 2, userId: users[0].id, restaurantId: restaurants[0].id },
        { date: new Date('2024-05-03'), time: '12:00', guests: 4, userId: users[1].id, restaurantId: restaurants[1].id },
        { date: new Date('2024-05-04'), time: '18:00', guests: 3, userId: users[0].id, restaurantId: restaurants[2].id },
        { date: new Date('2024-05-05'), time: '20:00', guests: 1, userId: users[1].id, restaurantId: restaurants[3].id },
        { date: new Date('2024-05-06'), time: '15:00', guests: 2, userId: users[1].id, restaurantId: restaurants[4].id },
    ]);

    console.log('Restaurants and reservations seeded successfully!');
}

module.exports = seedRestaurants; // Ensure this function is exported
