const db = require("../models");

function handleError(res) {
  return err => res.status(500).json(err);
}

let controllers = {};
const models = ['Decision', 'Factor', 'Mood', 'Option'];

models.forEach(modelName => {
  const model = db[modelName];
  controllers[modelName] = {
    findAll: function (req, res) {
      model
        .find(req.query)
        // .sort({ date: -1 })
        .then(doc => res.json(doc))
        .catch(handleError(res));
    },
    findById: function (req, res) {
      model
        .findById(req.params.id)
        .then(doc => res.json(doc))
        .catch(handleError(res));
    },
    create: function (req, res) {
      model
        .create(req.body)
        .then(doc => res.json(doc))
        .catch(handleError(res));
    },
    update: function (req, res) {
      model
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(doc => res.json(doc))
        .catch(handleError(res));
    },
    remove: function (req, res) {
      model
        .findById({ _id: req.params.id })
        .then(doc => doc.remove())
        .then(doc => res.json(doc))
        .catch(handleError(res));
    }
  }
})

module.exports = controllers;
