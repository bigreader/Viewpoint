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
      .select('options')
      .populate('options')
      .then(doc => res.json(doc.options))
      .catch(handleError(res));
  },
  findOne: function (req, res) {
    db.Option
      .findById(req.params.option)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  create: function (req, res) {
    db.Decision.findById(req.params.decision).then(decision => {
      var doc = new db.Option(req.body);
      decision.options.push(doc._id);
      decision.save();
      doc.save().then(saved => res.status(201).json(saved));
    }).catch(handleError(res));
  },
  update: function (req, res) {
    db.Option
      .findByIdAndUpdate(req.params.option, req.body, { new: true })
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  remove: function (req, res) {
    db.Option
      .findById(req.params.option)
      .then(doc => {
        db.Decision
        .findById(req.params.decision)
        .then(decision => {
          decision.options.pull(doc);
          decision.save();
          res.status(204).end();
        })
        .catch(handleError(res));
        doc.remove();
      })
      .catch(handleError(res));
  }
};
