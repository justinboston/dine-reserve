// Import the Sequelize library
const Sequelize = require('sequelize');

// Utilize the 'dotenv' package to load the .env file and set the environment variables to the process.env object.
require('dotenv').config();

let sequelize;

// Check if the application is deployed. If the DB_URL environment variable exists, it will be employed; otherwise, it detects that you're operating on your local machine and employs the environment variables from the .env file to configure Sequelize.
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;