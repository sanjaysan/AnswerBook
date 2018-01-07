const Sequelize = require('sequelize');
const config = require('../config/database');

const Op = Sequelize.Op;

// Setting up database connection details
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',
    operatorsAliases: Op,

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 30000
    }
});

// Logging into the database
sequelize.authenticate().then(function () {
    console.log('Connected to database ' + config.database)
}).catch(function (err) {
    console.error('Unable to connect to the database:', err)
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user');
db.Question = require('./questions');

module.exports = db;