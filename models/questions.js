module.exports = function (sequelize, DataTypes) {

  const questions = sequelize.define('questions', {
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

    Title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Body: {
        type: DataTypes.STRING,
        allowNull: false
    }

  });

  questions.addQuestion = function (newQuestion, callback) {
    questions.create(newQuestion).then(function (question) {
      return callback(null, question);
    })
  };

  questions.getQuestionById = function (id, callback) {
    questions.find({
      where: {
        id: id
      }
    }).then(function (question) {
      return callback(null, question);
    }).catch(function (err) {
      return callback(err, null);
    })
  };

  return questions;
};
