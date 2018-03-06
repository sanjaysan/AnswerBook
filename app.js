const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const app = express()

// Model
const db = require('./models/db')

// Users route
const users = require('./routes/users')

// Tags route
const tags = require('./routes/tags')

// Port number
const port = process.env.PORT || 5000

// CORS middleware
app.use(cors())

// Set static folder
app.use(express.static(path.resolve(__dirname, './answerbookui/build')))

// Body parser middleware
app.use(bodyParser.json())

// View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

require('./config/passport')(passport)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', users)
app.use('/tags', tags)

// Index route
app.get('/', function (req, res) {
  res.send('Welcome to AnswerBook')
})

// Sync and start server
db.sequelize.sync({force: true}).then(function () {
  app.listen(port, function () {
    console.log('Server started on port: ', port)
  })
})

// All requests
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './answerbookui/build', 'index.html'))
})

/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/

module.exports = app