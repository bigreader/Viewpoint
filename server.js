const express = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const userController = require('./controllers').user.direct;

const app = express();
const PORT = process.env.PORT || 3001;

passport.use(new LocalStrategy(function(username, password, back) {
  userController.findByUsername(username)
  .then(user => {
    if (!user) return back(null, false);
    if (user.password !== password) return back(null, false);
    return back(null, user);
  })
  .catch(back);
}));

passport.serializeUser((user, back) => back(null, user._id));
passport.deserializeUser((id, back) => {
  userController.findById(id)
  .then(user => back(null, user))
  .catch(back);
});


app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'bootcamp-viewpoint',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/viewpoint").then(() => {
  console.log('database connected');
});

app.listen(PORT, function () {
  console.log('api server running on ' + PORT);
});
