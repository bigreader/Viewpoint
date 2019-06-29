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
      decision.options.forEach(option => {
        var mood = new db.Mood({
          factor: doc._id,
          option: option._id
        });
        mood.save();
        decision.moods.push(mood._id);
      });
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
    db.Factor.findById(req.params.factor).then(doc => {
      db.Decision.findById(req.params.decision).then(decision => {
        db.Mood.find({ factor: doc._id }).then(moods => {
          decision.factors.pull(doc);
          moods.forEach(mood => {
            decision.moods.pull(mood);
            mood.remove();
          });
          decision.save();
          doc.remove();
          res.status(204).end();
        }).catch(handleError(res));
      }).catch(handleError(res));
    }).catch(handleError(res));
  }
};
