const db = require("../models");

function handleError(res) {
  return err => {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
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
      decision.factors.forEach(factor => {
        var mood = new db.Mood({
          option: doc._id,
          factor: factor._id
        });
        mood.save();
        decision.moods.push(mood._id);
      });
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
    db.Option.findById(req.params.option).then(doc => {
      db.Decision.findById(req.params.decision).then(decision => {
        db.Mood.find({ option: doc._id }).then(moods => {
          decision.options.pull(doc);
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
