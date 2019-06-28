const router = require("express").Router();
const decisionController = require("../controllers/decisionController");
const optionController = require("../controllers/optionController");
const factorController = require("../controllers/factorController");
const moodController = require("../controllers/moodController");

router.route("/decisions")
  .get(decisionController.findAll)
  .post(decisionController.create);

router.route("/decisions/:decision")
  .get(decisionController.findOne)
  .put(decisionController.update)
  .delete(decisionController.remove);

router.route("/decisions/:decision/options")
  .get(optionController.findAll)
  .post(optionController.create);

router.route("/decisions/:decision/options/:option")
  .get(optionController.findOne)
  .put(optionController.update)
  .delete(optionController.remove);

router.route("/decisions/:decision/factors")
  .get(factorController.findAll)
  .post(factorController.create);

router.route("/decisions/:decision/factors/:factor")
  .get(factorController.findOne)
  .put(factorController.update)
  .delete(factorController.remove);

router.route("/decisions/:decision/moods")
  .get(moodController.findAll);
  // .post(moodController.create);

router.route("/decisions/:decision/moods/:mood")
  .get(moodController.findOne)
  .put(moodController.update);
  // .delete(moodController.remove);

// "/decisions/:decision/moods/:option/:factor"

module.exports = router;
