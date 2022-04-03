const router = require("express").Router();
const controller = require("./orders.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router
  .route("/:orderId")
  .post(controller.create)
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .post(controller.create)
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;
