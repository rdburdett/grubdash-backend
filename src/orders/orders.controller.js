const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

//////////////////////////////

// EXISTS

// HASTEXT

//////////////////////////////

// CREATE

// READ

// UPDATE

// DELETE

// LIST


//////////////////////////////

module.exports = {
  create: [hasText, create],
  read: [orderExists, read],
  update: [orderExists, hasText, update],
  delete: [orderExists, destroy],
  list: [list],
  orderExists,
};