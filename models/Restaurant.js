// models/Restaurant.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Restaurant extends Model {}

    Restaurant.init({
        id: {
            type: DataTypes.INTEGER,
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
    }, {
        sequelize,
        modelName: 'restaurant',
        freezeTableName: true,
        timestamps: true, // Tracks creation and updates
    });

    return Restaurant;
};
