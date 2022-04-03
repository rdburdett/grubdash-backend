const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

//////////////////////////////

// EXISTS
function orderExists(req, res, next) {
  res.sendStatus(404)
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
  res.sendStatus(404)
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
function list(req, res, next) {
  res.sendStatus(404)
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