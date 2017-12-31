const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const config = require("../config/database");

const Op = Sequelize.Op;
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

sequelize
.authenticate()
 .then(function () {
	console.log('Connected to database ' + config.database);
})
 .catch(function (err) {
	console.error('Unable to connect to the database:', err);
});

const userSchema = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const User = module.exports = userSchema;

module.exports.getUserById = function (id, callback) {
	User.findAll({
		where: {
			id: id
		}
	}).then(function (user) {
		return callback(null, user);
	}).catch(function(err){
		return callback(err, null);
	});
};

module.exports.getUserByLastName = function (lastName, callback) {
	User.findAll({
		where: {
			lastName: lastName
		}
	}).then(function (user) {
		return callback(null, user);
	}).catch(function(err){
		return callback(err, null);
	});
};

module.exports.getUserByEmailID = function (email, callback) {
	User.findAll({
		where: {
			email: email
		}
	}).then(function (user) {
		return callback(null, user);
	}).catch(function(err){
		return callback(err, null);
	});
};

module.exports.addUser = function(newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		if (err) throw err;
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err;
			newUser.password = hash;
			User.create(newUser);
			return callback(err, newUser);
		});
	});
};


// PREVIOUS SUCCESSFUL TRIAL FOR
// CONNECTING TO POSTGRES
// var pool = new pg.Pool(config);
//
// // User schema
// const userSchema = "CREATE TABLE IF NOT EXISTS users(" +
// 		"  id SERIAL PRIMARY KEY," +
// 		"  name VARCHAR(200)," +
// 		"  email VARCHAR(200) NOT NULL," +
// 		"  username VARCHAR(200) NOT NULL," +
// 		"  password VARCHAR(20) NOT NULL" +
// 		")";
//
// var myClient;
// pool.connect(function (err, client, done) {
// 	if (err) {
// 		done();
// 		console.log("Database connection error: " + err);
// 	}
// 	else {
// 		console.info("Connected to database " + config.database);
//
// 		myClient = client;
// 		var createQuery = format(userSchema);
// 		myClient.query(createQuery, function (error, result) {
// 			if (error)
// 				console.error(error);
// 			else
// 				console.log("\"users\" table created");
// 		});
// 	}
// 	console.log("success");
// });
//
// if (myClient)
// 	module.exports = myClient;
