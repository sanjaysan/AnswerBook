const Sequelize = require('sequelize');
const config = require('../config/database');

// Setting up database connection details
const sequelize = new Sequelize(config.database, config.user, config.password, {

    host: config.host,
    dialect: 'postgres'

});

// Logging into the database
sequelize.authenticate().then(function () {
    console.log('Connected to database ' + config.database)
}).catch(function (err) {
    console.error('Unable to connect to the database:', err)
});

//creating global object

const db = {};

//adding sequelize, Sequelize to allow usage in other files
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.question = require('./questions')(sequelize,Sequelize);
db.answer = require('./answers')(sequelize, Sequelize);
db.tag = require('./tags')(sequelize, Sequelize);

//Relations!!!!
//USER-QUESTION 1:N
db.question.belongsTo(db.user, {foreignKey : 'userId'});
db.user.hasMany(db.question);

//USER-ANSWER 1:N
db.user.hasMany(db.answer);
db.answer.belongsTo(db.user, {foreignKey : 'userId'});

//QUESTION-ANSWER 1:N
db.question.hasMany(db.answer);
db.answer.belongsTo(db.question, {foreignKey: 'questionId'});

//YET TO ASSOCIATE FOR TAGS. N:M IS MY THOUGHT
//db.question.belongsToMany(db.tag);
//db.tag.belonsToMany(db.question);

module.exports = db;