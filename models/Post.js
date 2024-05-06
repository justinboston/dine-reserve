const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = require('./User')(sequelize);  // Import the User model

    class Post extends Model {}

    Post.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               
                model:  'userDetails',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'post',
        tableName: 'post' 
    });

    return Post;
};
