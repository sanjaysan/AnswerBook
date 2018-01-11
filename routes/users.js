const express = require('express');
const router = express.Router();
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const bcrypt = require('bcrypt');

// Register
router.post('/register', function (req, res) {

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    /*OLDER METHOD USING ADDUSER Currently Not working as an instance method
    db.user.addUser(newUser, function (err, user) {
        if (err)
            res.json({success: false, msg: 'Failed to register user'});
        else
            res.json({success: true, msg: 'User registered', userDetails: user})
    });*/

    bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err;

        // Encrypting the password into {@code hash}
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;

            // Storing the hashed password in the user object
            newUser.password = hash;
            db.user.create(newUser).then(function (user) {
                // Going back to caller
                return res.json(user);
            })

        })
    })

});



router.post('/authenticate', function (req, res) {

    // Getting data from form
    const username = req.body.username;
    const password = req.body.password;

    /* Older method not working due to instance method not being accesible
        Will check on it
    db.user.getUserByUserName(username, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({success: false, msg: 'User not found'})
        }

        // Comparing the entered pwd with that in the database
        db.user.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;

            if (isMatch) {
                // User will be logged out after 10 minutes
                const token = jwt.sign({user: user.username}, config.secret, {
                    expiresIn: 600
                });

                // Sending the user details in the response
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
                    }
                })
            }
            else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    })*/

    db.user.find({
        where: {
            username: username
        }
    }).then(function (user) {

        bcrypt.compare(password,user.password, function (error, isMatch) {

            if(error)
                throw error;

            if(isMatch)
            {
                const token = jwt.sign({user: user.username}, config.secret, {
                    expiresIn: 6000
                });

                return res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
                    }
                })
            }

            else
                return res.json({success: false, msg: 'Wrong password'})
        })

    }).catch(function (err) {

        return res.json({success: false, msg: 'No such user'})
    })
});

// Authenticate

// Dashboard route is protected using the json web token
// The authenticate method in passport invokes the
// JwtStrategy method in passport.js, authenticates the
// user and returns the user details
router.get('/dashboard', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json({user: req.user});
    });



module.exports = router;


// Search using id
/*
router.get('/:id([0-9]+)', function (req, res) {
    User.getUserById(req.params.id, function (err, user) {
        if (err)
            res.json({msg: 'User information not available'});
        else
            res.json({userDetails: user})
    })
});

// Search using emailID
router.get('/:email([A-Za-z0-9_.]+@[A-Za-z.]+)', function (req, res) {
    User.getUserByEmailID(req.params.email, function (err, user) {
        if (err)
            res.json({msg: 'User information not available'});
        else
            res.json({userDetails: user})
    })
});
*/


