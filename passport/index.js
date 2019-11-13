const passport = require('passport')
const User = require('../models/user')

passport.serializeUser(function (user, done) {
    done(null, user.email)
})

passport.deserializeUser(function (email, done) {
    User.findOne({ email }).lean().exec((err, user) => {
        done(err, user) // req.user
    })

})


// import all the strategy
const SignupStrategy = require('./SignupStrategy')
const SigninStrategy = require('./SigninStrategy')
// const GoogleStrategy = require('./GoogleStrategy')

passport.use('local-signup', SignupStrategy)
passport.use('local-signin', SigninStrategy)

module.exports = passport;