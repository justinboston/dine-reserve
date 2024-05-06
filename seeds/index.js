const sequelize = require('../config/connection'); 
const seedUsers = require('./user-seeds');
const seedRestaurants = require('./restaurant-seeds');
const seedReviews = require('./review-seeds'); 

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true }); // Drop and recreate tables

        console.log('Seeding users...');
        await seedUsers();

        console.log('Seeding restaurants...');
        await seedRestaurants();

        console.log('Seeding reviews...');
        await seedReviews(); 

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase().catch(console.error);
