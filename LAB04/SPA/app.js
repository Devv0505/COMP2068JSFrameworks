// Import required modules

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import route files

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');


// Initialize Express app

var app = express();


// View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware configuration

app.use(logger('dev'));

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handling

app.use('/', indexRouter);
app.use('/projects', projectsRouter);


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
