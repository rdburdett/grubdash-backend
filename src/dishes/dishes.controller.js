const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//////////////////////////////

// EXISTS
function dishExists(req, res, next) {
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
// (Do not allow dish id to be overwritten)
function update(req, res, next) {
  res.sendStatus(404)
}

// * NO DELETE *

// LIST
function list(req, res, next) {
  res.sendStatus(404)
}

//////////////////////////////

module.exports = {
  create: [hasText, create],
  read: [dishExists, read],
  update: [dishExists, hasText, update],
  list: [list],
  dishExists,
};
