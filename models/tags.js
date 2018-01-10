module.exports = function (sequelize, DataTypes) {

    const tags = sequelize.define('tags', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {

            type: DataTypes.STRING,
            allowNull: false
        }

    });
    return tags;
};