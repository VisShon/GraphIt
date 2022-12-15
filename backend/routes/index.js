var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/auth/callback/success', (req , res) => {
  res.header('Access-Control-Allow-Credentials', true);
  if(!req.user)
    res.redirect('/auth/callback/failure');
  res.send(JSON.stringify(req.user));
});

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: '/auth/google/failure'
}));

module.exports = router;
