const db = require("../models");

function handleError(res) {
  return err => {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  findAll: function (req, res) {
    db.Decision
      .find({ user: req.user._id })
      // .sort({ date: -1 })
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  findOne: function (req, res) {
    db.Decision
      .findById(req.params.decision)
      .populate('options factors')
      .populate({
        path: 'moods',
        populate: 'option factor'
      })
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  create: function (req, res) {
    const data = req.body;
    data.user = req.user._id;
    db.Decision
      .create(data)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  update: function (req, res) {
    db.Decision
      .findByIdAndUpdate(req.params.decision, req.body, { new: true })
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  remove: function (req, res) {
    db.Decision
      .findByIdAndDelete(req.params.decision)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  }
};
