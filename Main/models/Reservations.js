const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Reservation model and datatypes.
class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    resturant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'resturant',
          key: 'id',
        },
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'reservation',
  }
);

module.exports = Reservation;