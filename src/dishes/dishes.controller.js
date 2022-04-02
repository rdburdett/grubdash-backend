const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//////////////////////////////

// EXISTS

// HASTEXT

//////////////////////////////

// CREATE

// READ

// UPDATE

// LIST


//////////////////////////////

module.exports = {
  create: [hasText, create],
  read: [dishExists, read],
  update: [dishExists, hasText, update],
  list: [list],
  dishExists,
};
