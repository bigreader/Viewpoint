const router = require("express").Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/signup', userController.create);

module.exports = router;
