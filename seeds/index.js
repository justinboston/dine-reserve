const sequelize = require('../config/connection'); // Ensure this path is correct
const seedUsers = require('./user-seeds');
const seedRestaurants = require('./seedRestaurant');
const seedReviews = require('./review-seeds'); // If applicable

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true }); // Drop and recreate tables

        console.log('Seeding users...');
        await seedUsers();

        console.log('Seeding restaurants...');
        await seedRestaurants();

        console.log('Seeding reviews...');
        await seedReviews(); // If applicable

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase().catch(console.error);
