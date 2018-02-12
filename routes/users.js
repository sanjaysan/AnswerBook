const express = require('express');
const router = express.Router();
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Register
router.post('/register', function (req, res) {

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  //OLDER METHOD USING ADDUSER Currently Not working as an instance method
  db.user.addUser(newUser, function (err, user) {
    if (err)
      res.json({success: false, msg: 'Failed to register user'});
    else
      res.json({success: true, msg: 'User registered', userDetails: user})
  });
});

router.post('/login', function (req, res) {
  // Getting data from form
  const username = req.body.username;
  const password = req.body.password;

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
      } else {
        return res.json({success: false, msg: 'Wrong password'})
      }
    })
  })
});

// Authenticate

// Dashboard route is protected using the json web token
// The authenticate method in passport invokes the
// JwtStrategy method in passport.js, authenticates the
// user and returns the user details

router.get('/dashboard', passport.authenticate('jwt', {session: false}),
    function (req, res) {

  db.question.findAll({
    include: [
      {
        model: db.answer,
        required: true // For INNER JOIN
      }]
  }).then(function (questions) {

    const result = questions.map(function (question) {

      return Object.assign(
          {},
          {
            question_id: question.id,
            question_title: question.title,
            question_body: question.body,
            answers: question.answers.map(function (answer) {

              return Object.assign(
                  {},
                  {
                    answer_id: answer.id,
                    answer_body: answer.body
                  }
              )
            })
          }
      )
    });
    res.json(result);
  })
});

// Get the user information
router.get('/profile', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      res.json({user: req.user});
    }
);

//Search by ID
router.get('/:id([0-9]+)', passport.authenticate('jwt', {session: false}),
    function (req, res) {
      db.user.getUserById(req.params.id, function (err, user) {
        if (err)
          res.json({msg: 'User information not available'});
        else
          res.json({userDetails: user})
      })
    }
);

// Search using emailID
router.get('/:email([A-Za-z0-9_.]+@[A-Za-z.]+)', function (req, res) {
  db.user.getUserByEmailID(req.params.email, function (err, user) {
    if (err)
      res.json({msg: 'User information not available'});
    else
      res.json({userDetails: user})
  })
});

// Adds question with uid being userID
router.post('/:uid/questions', function (req, res) {

  const newQuestion = {
    title: req.body.title,
    body: req.body.body,
    userid: req.params.uid
  };

  db.user.getUserByUserName(req.params.user, function (err, user) {
    if (err || !user)
      res.json({msg: 'User information not available'});
    else {
      db.question.addQuestion(newQuestion, function (err, question) {
        if (err)
          res.json({msg: 'Question could not be added'});
        else
          res.json({success: true, questionDetails: question});
      })
    }
  })
});

//Profile Page. To get all questions
router.get('/:uid/questions',

    function (req, res) {

      // db.user.getUserById(req.params.uid, function (err, user) {
      //       if (err || !user) {
      //           res.json({msg: 'User information not available'});
      //       } else {
      //           db.question.getQuestionById(req.params.qid, function (err, question) {
      //               if (err)
      //                   res.json({msg: 'Question information not available'});
      //               else
      //                   res.json({questionDetails: question})
      //           })
      //       }
      //   })

    });

router.post('/:uid/questions/:qid',
    function (req, res) {
      const newAnswer = {
        body: req.body.body,
        questionid: req.params.qid,
        userid: req.params.uid
      };

      db.answer.addAnswer(newAnswer, function (err, answer) {
        if (err)
          res.json({msg: 'Answer not added'});
        else
          res.json({answerDetails: answer});

      })
    });

module.exports = router;




