const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const hbs = require('hbs');         // <-- IMPORTANT
require('dotenv').config();

// Load DB + Passport
const connectDB = require('./config/db');
const configPassport = require('./config/passport');
connectDB();
configPassport();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const expensesRouter = require('./routes/expenses');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register Handlebars Helpers

hbs.registerHelper('formatDatePretty', function(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/expenses', expensesRouter);

module.exports = app;
