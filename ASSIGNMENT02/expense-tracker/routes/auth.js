// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  const { username, email, password, confirm } = req.body;
  if (password !== confirm) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/auth/register');
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hash });
  req.flash('success', 'Registration successful, please login.');
  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/expenses',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

// GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/expenses');
  }
);

// logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
