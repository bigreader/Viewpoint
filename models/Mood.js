var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  val: Number,
  updated: {
    type: Date,
    default: Date.now
  }
});

var model = mongoose.model('Mood', schema);

module.exports = model;
