const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('./db')

const config = {
  usernameField: 'email',
  passwordField: 'password'
}

// NOTE: this callback function runs when passport.authenticate('local') is called
passport.use(new LocalStrategy(config, (email, password, done) => {
  db.findUserByEmail([email], (err, users) => {
    const user = users[0]
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false)
    }
    done(null, user)
  })
}))

// NOTE:
//   this is passed the value that serializeUser saved our session
//   whatever value we give to done() here will end up on req.user
passport.deserializeUser(function(id, done) {
  db.findUserById([id], (err, users) => {
      users[0].games = JSON.parse(users[0].games)
      users[0].teams = JSON.parse(users[0].teams)

    done(err, users[0])
  })
})

// NOTE:
//   this is passed the value from deserializeUser (req.user)
//   whatever value we give to done() here will be saved on our session
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

module.exports = passport
