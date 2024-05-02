const User = require('./User');
const Reservation = require('./Reservations');
const Resturant = require('./Resturants');

// Creates a relationship between User and Project model, with the User having a "has many" relationship with Project model.
User.belongsToMany(Resturant, {
  through:Reservation,
    foreignKey: 'user_id',
//   onDelete: 'CASCADE'
});

// Creates a relationship between User and Project model, with a "belongs to" relationship of the Project to the User.
Resturant.belongsToMany(User, {
    through:Reservation,
     foreignKey: 'resturant_id'
});

module.exports = { User, Reservation, Resturant };
