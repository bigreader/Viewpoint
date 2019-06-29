var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  img: String,
  order: Number
});

var model = mongoose.model('Option', schema);

module.exports = model;
