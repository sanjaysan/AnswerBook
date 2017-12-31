const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Register
router.post('/register', function (req, res) {
	const newUser = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	};
	User.sync({force: false}).then(function () {
		User.addUser(newUser, function (err, user) {
			if (err)
				res.json({success: false, msg: "Failed to register user"});
			else
				res.json({success: true, msg: "User registered", userDetails: user});
		});
	});
});

// Search using id
router.get('/:id([0-9]+)', function (req, res) {
	User.getUserById(req.params.id, function (err, user) {
		if (err)
			res.json({msg: "User information not available"});
		else
			res.json({userDetails: user});
	})
});

// Search using lastName
router.get('/:lastName([A-Za-z]+)', function (req, res) {
	User.getUserByLastName(req.params.lastName, function (err, user) {
		if (err)
			res.json({msg: "User information not available"});
		else
			res.json({userDetails: user});
	})
});

// Search using emailID
router.get('/:email([A-Za-z0-9_.]+@[A-Za-z.]+)', function (req, res) {
	User.getUserByEmailID(req.params.email, function (err, user) {
		if (err)
			res.json({msg: "User information not available"});
		else
			res.json({userDetails: user});
	})
});

// Authenticate
router.get('/authenticate', function (req, res) {
	res.send("AUTHENTICATE");
});

// Dashboard
router.get('/dashboard', function (req, res) {
	res.send("DASHBOARD");
});

module.exports = router;