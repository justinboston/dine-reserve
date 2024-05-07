const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Restaurant = require('./Restaurant')(sequelize); // Importing this model

    class Reservation extends Model {}

    Reservation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'userDetails',
                key: 'id',
            },
            onDelete: 'CASCADE', // For integrity
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'restaurant',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'reservation',
    });

    return Reservation;
};
