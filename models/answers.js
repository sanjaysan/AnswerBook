module.exports = function (sequelize, DataTypes) {
  return sequelize.define('answers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    upvotes: {
      type: DataTypes.INTEGER,
      min: 0,
      allowNull: true
    },

      Body: {
        type: DataTypes.STRING,
          allowNull: false
      }

    // accepted: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    //
    // ready_list: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  });
};