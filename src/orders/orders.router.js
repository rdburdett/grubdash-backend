const router = require("express").Router();

// TODO: Implement the /orders routes needed to make the tests pass

router
.route("/:urlId")
  .post(controller.create)
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;
