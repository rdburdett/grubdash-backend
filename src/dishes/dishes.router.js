const router = require("express").Router();
const controller = require("./dishes.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:dishId")
  .post(controller.create)
  .get(controller.read)
  .put(controller.update)
  // NO DELETE
  .all(methodNotAllowed);

router
  .route("/")
  .post(controller.create)
  .put(controller.update)
  // NO DELETE
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;
