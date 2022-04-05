const { stat } = require("fs");
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
    message: `Order id not found: ${req.params.orderId}`,
  });
}

// ISVALID
// * working
function isValid(req, res, next) {
  const { data } = req.body;
  let missingFieldsMessage = [];

  if (!data.deliverTo || data.deliverTo.length === 0) {
    missingFieldsMessage.push("Dish must include a deliverTo");
  }
  if (!data.mobileNumber || data.mobileNumber.length === 0) {
    missingFieldsMessage.push("Dish must include a mobileNumber");
  }
  if (!data.dishes) {
    missingFieldsMessage.push("Dish must include a dish");
  }

  if (data.dishes) {
    if (data.dishes.length === 0 || !Array.isArray(data.dishes)) {
      missingFieldsMessage.push("Order must include at least one dish");
    } else {
      data.dishes.forEach((dish, index) => {
        if (dish.quantity <= 0 || !Number.isInteger(dish.quantity)) {
          missingFieldsMessage.push(
            `Dish ${index} must have a quantity that is an integer greater than 0`
          );
        }
      });
    }
  }

  if (missingFieldsMessage.length > 0) {
    next({
      status: 400,
      message: missingFieldsMessage.join(", "),
    });
  } else next();
}

function isStatusValid(req, res, next) {
  const { data: { status } = {} } = req.body;

  if (
    status !== ("pending" || "preparing" || "out-for-delivery" || "delivered")
  ) {
    next({
      status: 400,
      message:
        "Order must have a status of pending, preparing, out-for-delivery, delivered.",
    });
  } else if (status === "delivered") {
    return next({
      status: 400,
      message: "A delivered order cannot be changed.",
    });
  }
  next();
}

//////////////////////////////

// CREATE
// * working
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
// * working
function read(req, res, next) {
  res.json({ data: res.locals.order });
}

// UPDATE
// (Do not allow order id to be overwritten)
function update(req, res, next) {
  const { data } = req.body;
  const orderId = Number(req.params.orderId);
  const foundOrder = res.locals.order;

  if (data.id && orderId !== Number(data.id)) {
    next({
      status: 400,
      message: `Order id does not match route id. Order: ${data.id}, Route: ${orderId}`,
    });
  }

  foundOrder.id = foundOrder.id.toString();
  foundOrder.deliverTo = data.deliverTo;
  foundOrder.mobileNumber = data.mobileNumber;
  foundOrder.dishes = data.dishes;
  res.json({ data: foundOrder });
}

// DELETE
function destroy(req, res, next) {
  const orderId = req.params.orderId;
  const foundOrder = res.locals.order;
  const index = orders.find((order) => order.id === Number(orderId));

  if (foundOrder.status === "pending") {
    orders.splice(index, 1);
    res.sendStatus(204);
  } else {
    next({
      status: 400,
      message: "An order cannot be deleted unless it is pending.",
    });
  }
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
  update: [orderExists, isValid, isStatusValid, update],
  delete: [orderExists, destroy],
  list: [list],
  orderExists,
};
