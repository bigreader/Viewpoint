var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  weight: Number,

  moods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood'
  }]
});

var model = mongoose.model('Factor', schema);

module.exports = model;
