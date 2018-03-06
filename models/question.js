module.exports = function (sequelize, DataTypes) {

  const questions = sequelize.define('questions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    answered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  })

  // Post a question
  questions.addQuestion = function (newQuestion, callback) {
    questions.create(newQuestion).then(function (question) {
      return callback(null, question)
    })
  }

  // Get question by its question id
  questions.getQuestionById = function (id, callback) {
    questions.find({
      where: {
        id: id
      }
    }).then(function (question) {
      return callback(null, question)
    }).catch(function (err) {
      return callback(err, null)
    })
  }

  return questions
}
