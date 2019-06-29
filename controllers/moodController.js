const db = require("../models");

function handleError(res) {
  return err => res.status(500).json(err);
}

module.exports = {
  findAll: function (req, res) {
    db.Decision
      .find(req.query.decision)
      .select('moods')
      .populate('moods')
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  findOne: function (req, res) {
    db.Mood
      .findById(req.params.mood)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  findOneByIntersect: function (req, res) {
    return res.status(501).end();
  },
  update: function (req, res) {
    db.Mood
      .findOneAndUpdate({ _id: req.params.mood }, req.body)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  }
};
