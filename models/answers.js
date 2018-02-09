module.exports = function (sequelize, DataTypes) {
  const answers = sequelize.define('answers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    score: {
      type: DataTypes.INTEGER,
      min: 0,
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
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

  answers.addAnswer = function (answer, callback) {
    answers.create(answer).then(function (answer) {
      return callback(null, answer)
    }).catch(function (err) {
      return callback(err, null)
    })
  };

  return answers;
};