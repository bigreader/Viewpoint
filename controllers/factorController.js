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
      .findById(req.params.decision)
      .select('factors')
      .populate('factors')
      .then(doc => res.json(doc.factors))
      .catch(handleError(res));
  },
  findOne: function (req, res) {
    db.Factor
      .findById(req.params.factor)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  create: function (req, res) {
    db.Decision.findById(req.params.decision).then(decision => {
      var doc = new db.Factor(req.body);
      decision.factors.push(doc._id);
      decision.save();
      doc.save().then(saved => res.status(201).json(saved));
    }).catch(handleError(res));
  },
  update: function (req, res) {
    db.Factor
      .findByIdAndUpdate(req.params.factor, req.body, { new: true })
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  remove: function (req, res) {
    db.Factor
      .findById(req.params.factor)
      .then(doc => {
        db.Decision
        .findById(req.params.decision)
        .then(decision => {
          decision.factors.pull(doc);
          decision.save();
          res.status(204).end();
        })
        .catch(handleError(res));
        doc.remove();
      })
      .catch(handleError(res));
  }
};
