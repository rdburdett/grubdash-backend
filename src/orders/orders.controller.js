const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

//////////////////////////////

// EXISTS
// * working
function orderExists(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find((order) => (order.id = Number(orderId)));
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
function isValid(req, res, next) {
  input = req.body.data;
  let missingFieldsMessage = [];

  if (!input.deliverTo || input.deliverTo.length === 0) {
    missingFieldsMessage.push("Dish must include a deliverTo");
  }
  if (!input.mobileNumber || input.mobileNumber.length === 0) {
    missingFieldsMessage.push("Dish must include a mobileNumber");
  }
  if (!input.dishes) {
    missingFieldsMessage.push("Dish must include a dish");
  }

  if (input.dishes) {
    if (input.dishes.length === 0 || !Array.isArray(input.dishes)) {
      missingFieldsMessage.push("Order must include at least one dish");
    } else {
      input.dishes.forEach((dish, index) => {
        if (dish.quantity <= 0 || !Number.isInteger(dish.quantity)) {
          missingFieldsMessage.push(
            `Dish ${index} must have a quantity that is an integer greater than 0`
          );
        }
      });
    }
  }

  if (missingFieldsMessage.length > 0) {
    console.log(input.dishes);
    next({
      status: 400,
      message: missingFieldsMessage.join(", "),
    });
  } else next();
}

//////////////////////////////

// CREATE
function create(req, res, next) {
  const { data } = req.body;
  const newOrder = {
    id: nextId(),
    ...data,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

// READ
function read(req, res, next) {
  res.json({ data: res.locals.order });
}

// UPDATE
// (Do not allow order id to be overwritten)
function update(req, res, next) {
  res.sendStatus(404);
}

// DELETE
function destroy(req, res, next) {
  res.sendStatus(404);
}

// LIST
// * working
function list(req, res, next) {
  res.json({ data: orders });
}

//////////////////////////////

module.exports = {
  create: [isValid, create],
  read: [orderExists, read],
  update: [orderExists, isValid, update],
  delete: [orderExists, destroy],
  list: [list],
  orderExists,
};
