var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  set: Boolean,
  val: Number,
  updated: {
    type: Date,
    default: Date.now
  },

  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  },
  factor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factor'
  }
});

var model = mongoose.model('Mood', schema);

module.exports = model;
