const sequelize = require('../config/connection'); 
const User = require('./User')(sequelize);
const Restaurant = require('./Restaurant')(sequelize);
const Reservation = require('./Reservation')(sequelize);
const Review = require('./Review')(sequelize);
const Post = require('./Post')(sequelize);


User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Restaurant.hasMany(Reservation, { foreignKey: 'restaurantId' });
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Restaurant, Reservation, Review, Post, sequelize };
