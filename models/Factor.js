var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  weight: Number,
  order: Number
});

var model = mongoose.model('Factor', schema);

module.exports = model;
