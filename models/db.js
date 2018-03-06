const Sequelize = require('sequelize')
const config = require('../config/database')

// Setting up database connection details
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'postgres'
})

// Logging into the database
sequelize.authenticate().then(function () {
  console.log('Connected to database ' + config.database)
}).catch(function (err) {
  console.error('Unable to connect to the database:', err)
})

// Creating global object
const db = {}

// Adding sequelize, Sequelize to allow usage in other files
db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./user')(sequelize, Sequelize)
db.questions = require('./question')(sequelize, Sequelize)
db.answers = require('./answers')(sequelize, Sequelize)
db.tags = require('./tag')(sequelize, Sequelize)

// Relations
// User-Question 1:N
db.questions.belongsTo(db.users, {foreignKey: 'userid'})
db.users.hasMany(db.questions, {foreignKey: 'userid'})

// Adding username as a foreign key to questions table
db.questions.belongsTo(db.users, {
  as: 'AskedBy',
  foreignKey: 'askedBy',
  targetKey: 'username'
})

// User-Answer 1:N
db.answers.belongsTo(db.users, {foreignKey: 'userid'})
db.users.hasMany(db.answers, {foreignKey: 'userid'})

// Adding username as a foreign key to answers table
db.answers.belongsTo(db.users, {
  as: 'AnsweredBy',
  foreignKey: 'answeredBy',
  targetKey: 'username'
})

// Question-Answer 1:N
db.answers.belongsTo(db.questions, {foreignKey: 'questionid'})
db.questions.hasMany(db.answers, {foreignKey: 'questionid'})

// Question-Tag N:M
// Adds methods getTags, setTags, addTag, addTags to questions
// schema and getQuestions, setQuestions, addQuestion,
db.questions.belongsToMany(db.tags, {through: 'questiontag'})
db.tags.belongsToMany(db.questions, {through: 'questiontag'})

module.exports = db