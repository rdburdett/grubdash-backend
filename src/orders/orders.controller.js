const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

//////////////////////////////

// EXISTS
// * working
function orderExists(req, res, next) {
  const { orderId } = req.params
  const foundOrder = orders.find((order) => order.id = Number(orderId))
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({
    status: 404,
    message: `Order id not found: ${req.params.useId}`,
  });
}

// HASTEXT
function hasText(req, res, next) {
  res.sendStatus(404)
}

//////////////////////////////

// CREATE
function create(req, res, next) {
  
  res.sendStatus(404)
}

// READ
function read(req, res, next) {
  res.json({ data: res.locals.order });
}

// UPDATE
// (Do not allow order id to be overwritten)
function update(req, res, next) {
  res.sendStatus(404)
}

// DELETE
function destroy(req, res, next) {
  res.sendStatus(404)
}

// LIST
// * working
function list(req, res, next) {
  res.json({ data: orders });
}


//////////////////////////////

module.exports = {
  create: [hasText, create],
  read: [orderExists, read],
  update: [orderExists, hasText, update],
  delete: [orderExists, destroy],
  list: [list],
  orderExists,
};