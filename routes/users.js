const express = require('express');
const router = express.Router();
const config = require('../config/database');
const User = require('../models/user');
const Question = require('../models/questions');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', function (req, res) {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    // Saving the user details in the database
    // force: false -> does not drop the users
    // table
    User.addUser(newUser, function (err, user) {
        if (err)
            res.json({success: false, msg: 'Failed to register user'});
        else
            res.json({success: true, msg: 'User registered', userDetails: user})
    });


});

module.exports = router;

/*// Search using id
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

// Authenticate
router.post('/authenticate', function (req, res) {

    // Getting data from form
    const username = req.body.username;
    const password = req.body.password;

    // Getting the user details by username
    User.getUserByUserName(username, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({success: false, msg: 'User not found'})
        }

        // Comparing the entered pwd with that in the database
        User.comparePassword(password, user.password, function (err, isMatch) {
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
    })
});

// Dashboard route is protected using the json web token
// The authenticate method in passport invokes the
// JwtStrategy method in passport.js, authenticates the
// user and returns the user details
router.get('/dashboard', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json({user: req.user});
    });
*/


//Method to add question. Gets user Id from passport authentication

/*router.post('/question', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        const newQuestion = {
            content: req.content,
            userId: req.user.id
        };
        Question.sync({force: false}).then(function () {
            Question.addQuestion(newQuestion, function (err, question) {
                if (err)
                    res.json({success: false, msg: 'Failed to enter question'});
                else
                    res.json({success: true, msg: 'Question entered', questionDetails: question})
            })
        })
    });
*/