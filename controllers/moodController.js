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
    db.Factor
      .findById(req.params.factor)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  create: function (req, res) {
    db.Factor
      .create(req.body)
      .then(doc => {
        db.Decision
        .findById(req.params.decision)
        .then(decision => {
          if (err) return handleError(res);
          decision.factors.push(doc._id);
          decision.save();
          res.json(doc);
        })
        .catch(handleError(res));
      })
      .catch(handleError(res));
  },
  update: function (req, res) {
    db.Factor
      .findOneAndUpdate({ _id: req.params.factor }, req.body)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  remove: function (req, res) {
    db.Factor
      .findById({ _id: req.params.factor })
      .then(doc => {
        db.Decision
        .findById(req.params.decision)
        .then(decision => {
          if (err) return handleError(res);
          decision.factors.push(doc._id);
          decision.save();
          res.json(doc);
        })
        .catch(handleError(res));
        doc.remove();
      })
      .catch(handleError(res));
  }
};
