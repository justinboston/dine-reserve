const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Review extends Model {}

    Review.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 }, // Ensures ratings are between 1 and 5
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'userDetails', key: 'id' },
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            references: { model: 'restaurant', key: 'id' },
        },
    }, {
        sequelize,
        modelName: 'review',
    });

    return Review;
};
