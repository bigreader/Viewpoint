const db = require("../models");

function handleError(res) {
  return err => {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  direct: {
    findById: function (id) {
      return db.User.findById(id);
    },
    findByUsername: function (username) {
      return db.User.findOne({ username: username });
    }
  },
  findOne: function (req, res) {
    db.Option
      .findById(req.params.option)
      .then(doc => res.json(doc))
      .catch(handleError(res));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(doc => {
        res.json(doc);
      })
      .catch(handleError(res));
  }
};
