const bcrypt = require('bcrypt');
const userController = require('../controllers').user.direct;

const saltRounds = 10;

module.exports.hash = function (str) {
  return bcrypt.hash(str, saltRounds);
}

module.exports.verify = function (username, password, back) {
  userController.findByUsername(username)
    .then(user => {
      if (!user) return back(null, false);
      bcrypt.compare(password, user.password).then(match => {
        if (match) return back(null, user);
        back(null, false);
      }).catch(back);
    })
    .catch(back);
}

module.exports.serialize = function (user, back) {
  back(null, user._id);
}
module.exports.deserialize = function (id, back) {
  userController.findById(id)
    .then(user => back(null, user))
    .catch(back);
}
