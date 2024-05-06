const { User, Restaurant, Reservation } = require('./models'); 
const sequelize = require('./config/connection'); 
const bcrypt = require('bcrypt'); // For hashing passwords

async function seedDatabase() {
    await sequelize.sync({ force: true }); 

    // Seed Users
    const users = await User.bulkCreate([
        { username: 'johndoe', email: 'john@example.com', password: bcrypt.hashSync('password123', 10) },
        { username: 'janedoe', email: 'jane@example.com', password: bcrypt.hashSync('password456', 10) },
    ], { returning: true }); // IDs are returned for creating reservations

    // Seed Restaurants
    const restaurants = await Restaurant.bulkCreate([
        { name: 'The Gourmet Place', type: 'Fine Dining', address: '123 Main St', image: 'image_url1.jpg' },
        { name: 'Quick Bites', type: 'Fast Food', address: '456 Elm St', image: 'image_url2.jpg' },
        { name: 'Sushi World', type: 'Japanese', address: '789 Pine St', image: 'image_url3.jpg' },
        { name: 'Pasta House', type: 'Italian', address: '321 Maple St', image: 'image_url4.jpg' },
        { name: 'Café Delight', type: 'Café', address: '654 Oak St', image: 'image_url5.jpg' },
    ], { returning: true }); // Ensures IDs are returned for creating reservations

    // Seed Reservations
    await Reservation.bulkCreate([
        { date: new Date('2024-05-01'), time: '19:00', guests: 2, user_id: users[0].id, restaurant_id: restaurants[0].id },
        { date: new Date('2024-05-03'), time: '12:00', guests: 4, user_id: users[1].id, restaurant_id: restaurants[1].id },
        { date: new Date('2024-05-04'), time: '18:00', guests: 3, user_id: users[0].id, restaurant_id: restaurants[2].id },
        { date: new Date('2024-05-05'), time: '20:00', guests: 1, user_id: users[1].id, restaurant_id: restaurants[3].id },
        { date: new Date('2024-05-06'), time: '15:00', guests: 2, user_id: users[1].id, restaurant_id: restaurants[4].id },
    ]);

    console.log('Database seeded successfully!');
}

seedDatabase().catch(console.error);
