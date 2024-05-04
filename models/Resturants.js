const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Resturant model and datatypes.
class Resturant extends Model {}

Resturant.init(
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
    modelName: 'resturant',
  }
);

module.exports = Resturant;
