module.exports = function (sequelize, DataTypes) {
  return sequelize.define('answers', {
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
    },

    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    ready_list: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};