const bcrypt = require('bcryptjs');

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
      allowNull: false,
      unique: true

    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // User rating based on questions, answers, ready-lists
    rating: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      min: 0,
      allowNull: true
    },

    // To decide what the user wishes to be display on profile
    // 0 is private mode. Only stats are shown not the exact details
    mode: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    }
  });

  users.addUser = function (newUser, callback) {
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

  users.getUserByUserName = function (username, callback) {
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

  users.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
      if (err) throw err;
      else
        callback(null, isMatch)
    })
  };

  users.getUserById = function (id, callback) {
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

  users.getUserByEmailID = function (email, callback) {
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

  return users;
};