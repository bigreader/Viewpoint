var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  img: String,

  moods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood'
  }]
});

var model = mongoose.model('Option', schema);

module.exports = model;
