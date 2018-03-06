const express = require('express')
const router = express.Router()
const config = require('../config/database')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../models/db')

// Register
router.post('/register', function (req, res) {

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }

  //OLDER METHOD USING ADDUSER Currently Not working as an instance method
  db.users.addUser(newUser, function (err, user) {
    if (err)
      res.json({success: false, msg: 'Failed to register user'})
    else
      res.json({success: true, msg: 'User registered', userDetails: user})
  })
})

router.post('/login', function (req, res) {
  // Getting data from form
  const username = req.body.username
  const password = req.body.password

  db.users.getUserByUserName(username, function (err, user) {
    if (err) throw err

    if (!user) {
      return res.json({success: false, msg: 'User not found'})
    }

    // Comparing the entered pwd with that in the database
    db.users.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err

      if (isMatch) {
        // User will be logged out after 10 minutes
        const token = jwt.sign({user: user.username}, config.secret, {
          expiresIn: 600
        })

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
})

// Authenticate

// Dashboard route is protected using the json web token
// The authenticate method in passport invokes the
// JwtStrategy method in passport.js, authenticates the
// user and returns the user details
router.get('/dashboard', function (req, res) {
  db.questions.findAll({
    include: [{
      model: db.answers,
      required: true,
    }]
  }).then(function (questions) {
    const result = questions.map(function (question) {
      return Object.assign(
        {},
        {
          question_id: question.id,
          question_title: question.title,
          question_body: question.body,
          asked_by: question.userid,
          answers: question.answers.map(function (answer) {
            return Object.assign(
              {},
              {
                answer_id: answer.id,
                answer_body: answer.body,
                answered_by: answer.userid
              }
            )
          })
        }
      )
    })
    res.json(result);
    ``
  })
})

// Get the user information
router.get('/profile', passport.authenticate('jwt', {session: false}),
  function (req, res) {
    res.json({user: req.user})
  }
)

//Search by ID
router.get('/:id([0-9]+)', passport.authenticate('jwt', {session: false}),
  function (req, res) {
    db.users.getUserById(req.params.id, function (err, user) {
      if (err)
        res.json({success: false, msg: 'User information not available'})
      else
        res.json({userDetails: user})
    })
  }
)

// Search using emailID
router.get('/:email([A-Za-z0-9_.]+@[A-Za-z.]+)', function (req, res) {
  db.users.getUserByEmailID(req.params.email, function (err, user) {
    if (err)
      res.json({success: false, msg: 'User information not available'})
    else
      res.json({userDetails: user})
  })
})

// Adds question with uid being userID
router.post('/:uid/questions', function (req, res) {
  const newQuestion = {
    title: req.body.title,
    body: req.body.body,
    userid: req.params.uid
  }

  db.users.getUserById(req.params.uid, function (err, user) {
    if (err || !user) {
      res.json({success: false, msg: 'User information not available'})
    } else {

      // Setting the askedBy field with the username
      newQuestion['askedBy'] = user.username

      // Inserting the question
      db.questions.addQuestion(newQuestion, function (err, question) {
        if (err)
          res.json({success: false, msg: 'Question could not be added'})
        else {
          // Inserting tags if question insertion is successful
          if (req.body.tags) {
            req.body.tags.map(function (tag) {
              db.tags.getTagByName(tag, function (err, returnedTag) {
                if (err) throw err
                else {
                  // If tag is not already present, then insert it
                  // into the tags table
                  if (!returnedTag) {
                    db.tags.createTag(Object.assign({}, {name: tag}), function (err, createdTag) {
                      if (err)
                        res.json({success: false, msg: 'Could not insert tag'})
                      else {
                        // Associating the questionId with the newly created tagId
                        // by inserting a (questionId, tagId) entry in the
                        // "questiontag" table
                        question.addTag(createdTag.id).catch(function (err) {
                          console.log(err)
                        })
                      }
                    })
                  } else {
                    // Associating the questionId with the existing tagId
                    question.addTag(returnedTag.id).catch(function (err) {
                      console.log(err)
                    })
                  }
                }
              })
            })
          }

          // Returning a successful response
          res.json({
            success: true,
            msg: 'Your question has been posted!',
            questionDetails: question,
            tags: req.body.tags
          })
        }
      })
    }
  })
})

// Get all questions posted by a user
router.get('/:uid/questions', function (req, res) {
  // db.users.getUserById(req.params.uid, function (err, user) {
  //   if (err || !user)
  //     res.json({success: false, msg: 'User not found'})
  //   else {
  //     db.questions.findAll({
  //       where: {
  //         userid: req.params.uid
  //       }
  //     }).then(function(questions) {
  //       res.json(questions)
  //     }).catch(function(err) {
  //       res.json({success: false, msg: 'User not found'})
  //     })
  //   }
  // });
  db.users.findAll({
    where: {id: req.params.uid},
    include: [
      {
        model: db.questions,
        required: true
      }]
  }).then(function (users) {
    const userQuesObj = users.map(function (user) {
      return Object.assign(
        {},
        {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          questions: user.questions
        }
      )
    })
    if (userQuesObj && userQuesObj.length)
      res.json(userQuesObj)
    else
      res.json({success: false, msg: 'User not found'})
  })
})

// Post an answer to a question
router.post('/:uid/questions/:qid', function (req, res) {
  const newAnswer = {
    body: req.body.body,
    questionid: req.params.qid,
    userid: req.params.uid,
    answeredBy: req.body.answeredBy
  }

  db.users.getUserById(req.params.uid, function (err, user) {
    if (err || !user)
      res.json({success: false, msg: 'User not found'})
    else {
      db.questions.getQuestionById(req.params.qid, function (err, question) {
        if (err || !question)
          res.json({success: false, msg: err.message})
        else {
          db.answers.addAnswer(newAnswer, function (err, answer) {
            if (err)
              res.json({success: false, msg: err.message})
            else
              res.json({answerDetails: answer})
          })
        }
      })
    }
  })
})

// Get the answers to a question
router.get('/questions/:qid', function (req, res) {
  db.questions.findAll({
    where: {id: req.params.qid},
    include: [
      {
        model: db.answers
      }]
  }).then(function (ans) {
    res.json(ans)
  }).catch(function (err) {
    res.json({success: false, msg: err.message})
  })
})

module.exports = router
