const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Restaurant model and datatypes.
class Restaurant extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'restaurant',
  }
);

module.exports = Restaurant;
