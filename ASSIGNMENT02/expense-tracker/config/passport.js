const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

module.exports = () => {
  // Local strategy
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user || !user.password) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // GitHub strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          username: profile.username || profile.displayName,
          email: profile.emails && profile.emails[0]?.value
        });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
