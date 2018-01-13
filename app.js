const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

// Users route
const users = require('./routes/users');

// Port number
const port = process.env.PORT || 8080;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index route
app.get('/', function (req, res) {
  res.send('Invalid endpoint');
});

// All requests
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './answerbookui/build', 'index.html'))
});

// Start server
app.listen(port, function () {
  console.log('Server started on port ' + port);
});