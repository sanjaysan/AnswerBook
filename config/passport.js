const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models/db');
const config = require('../config/database');

module.exports = function (passport) {
  // Options
  let opts = {};

  // Method to pass the web token
  opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  opts.secretOrKey = config.secret;

  // Gives the JWT payload
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    db.users.getUserByUserName(jwt_payload.user, function (err, user) {
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