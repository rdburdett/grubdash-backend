const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//////////////////////////////

// EXISTS
// * working
function dishExists(req, res, next) {
  const { dishId } = req.params;
  const foundDish = dishes.find((dish) => (dish.id = Number(dishId)));
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  }
  next({
    status: 404,
    message: `Dish does not exist: ${dishId}`,
  });
}

// ISVALID
// * working
function isValid(req, res, next) {
  const { data } = req.body;
  let missingFieldsMessage = [];

  if (!data.name || data.name.length === 0) {
    missingFieldsMessage.push("Dish must include a name");
  }
  if (!data.description || data.description.length === 0) {
    missingFieldsMessage.push("Dish must include a description");
  }
  if (!data.price) {
    missingFieldsMessage.push("Dish must include a price");
  }
  if (data.price <= 0 || !Number.isInteger(data.price)) {
    missingFieldsMessage.push(
      "Dish must have a price that is an integer greater than 0"
    );
  }
  if (!data.image_url || data.image_url.length === 0) {
    missingFieldsMessage.push("Dish must include an image_url");
  }

  missingFieldsMessage.length > 0
    ? next({
        status: 400,
        message: missingFieldsMessage.join(", "),
      })
    : next();
}

//////////////////////////////

// CREATE
// * working
function create(req, res, next) {
  const { data } = req.body;
  const newDish = {
    id: nextId(),
    ...data,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

// READ
// * working
function read(req, res, next) {
  res.json({ data: res.locals.dish });
}

// UPDATE
// (Do not allow dish id to be overwritten)
// * working
function update(req, res, next) {
  const { data } = req.body;
  const dishId = Number(req.params.dishId);
  const foundDish = res.locals.dish;
  if (data.id && dishId !== Number(data.id)) {
    next({
      status: 400,
      message: `Dish id does not match route id. Dish: ${data.id}, Route: ${dishId}`,
    });
  }
  foundDish.id = foundDish.id.toString();
  foundDish.name = data.name;
  foundDish.description = data.description;
  foundDish.price = data.price;
  foundDish.image_url = data.image_url;
  res.json({ data: foundDish });
}

// * NO DELETE *

// LIST
// * working
function list(req, res, next) {
  res.json({ data: dishes });
}

//////////////////////////////

module.exports = {
  create: [isValid, create],
  read: [dishExists, read],
  update: [dishExists, isValid, update],
  list: [list],
  dishExists,
};
