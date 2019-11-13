var express = require('express');
var router = express.Router();
const passport = require('../passport')

// passport.authenticate('local-signup', () => {

// })


router.post('/signup', (req, res, next) => {

  // custom Passport Callback
  passport.authenticate('local-signup', function(error, user, info) {
    if(error) {
      return res.status(500).json({
        message: error || 'Ooops, something happend',
      })
    }
    
    // Persistent login
    req.logIn(user, (error) => {
      if(error) {
        return res.status(500).json({
          message: error || 'Ooops, something happend',
        })
      }
      user.isAuthenticated = true
      //TODO don't send the user password to the client
      return res.json(user);
    })
  })(req, res, next);
})


router.post('/signin', function(req, res, next) {

  // custom Passport Callback
  passport.authenticate('local-signin', function(error, user, info) {
    if(error) {
      return res.status(500).json({
        message: error || 'Ooops, something happend',
      })
    }
    
    // Persistent login
    req.logIn(user, (error) => {
      if(error) {
        return res.status(500).json({
          message: error || 'Ooops, something happend',
        })
      }
      user.isAuthenticated = true
      //TODO don't send the user password to the client
      return res.json(user);
    })
  })(req, res, next);
});

router.get('/api', (req, res) => {
  const email = req.user; // req.session.passport.session
  res.json({
    message: "Hello World"
  })
})

module.exports = router;
