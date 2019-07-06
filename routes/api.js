const router = require("express").Router();
const controllers = require('../controllers');

router.route("/users")
  .get(controllers.user.findAll)
  .post(controllers.user.create);

router.route("/users/:user")
  .get(controllers.user.findOne)
  .put(controllers.user.update)
  .delete(controllers.user.remove);

router.route("/decisions")
  .get(controllers.decision.findAll)
  .post(controllers.decision.create);

router.route("/decisions/:decision")
  .get(controllers.decision.findOne)
  .put(controllers.decision.update)
  .delete(controllers.decision.remove);

router.route("/decisions/:decision/options")
  .get(controllers.option.findAll)
  .post(controllers.option.create);

router.route("/decisions/:decision/options/:option")
  .get(controllers.option.findOne)
  .put(controllers.option.update)
  .delete(controllers.option.remove);

router.route("/decisions/:decision/factors")
  .get(controllers.factor.findAll)
  .post(controllers.factor.create);

router.route("/decisions/:decision/factors/:factor")
  .get(controllers.factor.findOne)
  .put(controllers.factor.update)
  .delete(controllers.factor.remove);

router.route("/decisions/:decision/moods")
  .get(controllers.mood.findAll);
  // .post(controllers.mood.create);

router.route("/decisions/:decision/moods/:mood")
  .get(controllers.mood.findOne)
  .put(controllers.mood.update);
  // .delete(controllers.mood.remove);

module.exports = router;
