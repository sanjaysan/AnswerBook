const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function (passport) {
  // Options
  var opts = {};

  // Method to pass the web token
  opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  opts.secretOrKey = config.secret;

  // Gives the JWT payload
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.getUserByUserName(jwt_payload.user, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    });
  }));
};