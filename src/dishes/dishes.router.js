const router = require("express").Router();

// TODO: Implement the /dishes routes needed to make the tests pass

// ROUTE "/:dishId"

// ROUTE "/"
router
// ROUTE
.route("/:urlId")
  // CREATE
  .post(controller.create)
  // READ
  .get(controller.read)
  // UPDATE
  .put(controller.update)
  // LIST
  .get(controller.list)
  .all(methodNotAllowed);

// CREATE
// READ
// UPDATE
// LIST


module.exports = router;
