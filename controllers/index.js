const db = require("../models");

module.exports = {
  user: require("../controllers/userController"),
  decision: require("../controllers/decisionController"),
  option: require("../controllers/optionController"),
  factor: require("../controllers/factorController"),
  mood: require("../controllers/moodController")
}
