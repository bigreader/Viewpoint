const mongoose = require('mongoose');
const shortid = require('shortid');

const schema = new mongoose.Schema({
  _id: {
    'type': String,
    'default': shortid.generate
  },
  name: String,
  deadline: Date,

  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }],
  factors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factor'
  }],
  moods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood'
  }]
});

var model = mongoose.model('Decision', schema);

module.exports = model;
