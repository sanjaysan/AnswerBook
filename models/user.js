module.exports = function (sequelize, DataTypes) {

    const users = sequelize.define('users', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false

        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },


        //USER RATING BASED ON QUESTIONS, ANSWERS, READY-LISTS

        rating: {
            type: DataTypes.INTEGER,
            min: 0,
            allowNull: true
        },

        //To decide what the user wishes to be display on profile
        //0 is private mode. Only stats are shown not the exact details

        mode: {

            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        }

    });

    return users;
};

/*
// Querying user by id
module.exports.getUserById = function (id, callback) {
  users.find({
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
    users.find({
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
    users.find({
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
        users.create(newUser).then(function (user) {
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
*/
