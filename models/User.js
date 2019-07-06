const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  password: String
});

var model = mongoose.model('User', schema);

module.exports = model;
