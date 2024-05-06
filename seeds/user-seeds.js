
// Correcting the import in the seeding script
const { User } = require('../models');

const bcrypt = require('bcrypt');

const userData = [
  {
    username: 'alice',
    password: 'password123'
  },
  {
    username: 'bob',
    password: 'password123'
  },
  {
    username: 'charlie',
    password: 'password123'
  }
];

const seedUsers = async () => {
  try {
    // Directly seed users, relying on model hooks to handle hashing
    const seededUsers = await User.bulkCreate(userData, {
      individualHooks: true,  // Ensures hooks like `beforeCreate` are triggered
      returning: true,
    });

    console.log('Users seeded successfully:', seededUsers.map(user => user.get({ plain: true })));
  } catch (error) {
    console.error('Failed to seed users:', error);
  }
};

module.exports = seedUsers;
