const bcrypt = require('bcryptjs');
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

// Schema for the users table
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

// Exporting the schema to be used in
// other files
const User = module.exports = userSchema;

// Querying user by id
module.exports.getUserById = function (id, callback) {
  User.find({
    where: {
      id: id
    }
  }).then(function (user) {
    return callback(null, user)
  }).catch(function (err) {
    return callback(err, null)
  })
};

// Querying user by username
module.exports.getUserByUserName = function (username, callback) {
  User.find({
    where: {
      username: username
    }
  }).then(function (user) {
    return callback(null, user)
  }).catch(function (err) {
    return callback(err, null)
  })
};

// Querying user by email
module.exports.getUserByEmailID = function (email, callback) {
  User.find({
    where: {
      email: email
    }
  }).then(function (user) {
    return callback(null, user)
  }).catch(function (err) {
    return callback(err, null)
  })
};

// Adding a user to the database
module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;

    // Encrypting the password into {@code hash}
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;

      // Storing the hashed password in the user object
      newUser.password = hash;
      User.create(newUser).then(function (user) {
        // Going back to caller
        return callback(err, user)
      })

    })
  })
};

// Comparing the entered password with the hashed version in the
// database. IsMatch equates to true if the passwords match
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err;
    else
      callback(null, isMatch)
  })
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
