module.exports = function (sequelize, DataTypes) {

    const questions = sequelize.define('questions', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        content: {

            type: DataTypes.TEXT,
            allowNull: false
        },

        upvotes: {

            type: DataTypes.INTEGER,
            min: 0,
            allowNull: true
        }

    });
    return questions;
};
