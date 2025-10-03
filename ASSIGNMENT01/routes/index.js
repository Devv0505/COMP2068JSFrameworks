var express = require('express');
var router = express.Router();

/* GET Home page */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET About Me page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Projects page */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET Contact Me page */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
