const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const ListOrder = require('../models/listOrderModel');
const Order = require('../models/OrderModel');

exports.getUserOrder = asyncErrorHandler(async (req, res, next) => {
  const listOrder = await Order.find({
    account_id: req.user.id,
  });
  res.status(200).json({
    success: true,
    listOrder,
  });
});

exports.getSalespersonOrder = asyncErrorHandler(async (req, res, next) => {
  const listOrder = await Order.find({
    salesperson_id: req.user.id,
  });
  res.status(200).json({
    success: true,
    listOrder,
  });
});

exports.createOrder = asyncErrorHandler(async (req, res, next) => {
  const list = await createListOrder(req.body.list_order);
  req.body.list_order_id = list;
  req.body.account_id = req.user.id;
  const order = await Order.create(req.body);
  res.status(200).json({
    success: true,
    order,
  });
});

const createListOrder = async (listOrder) => {
  const list = await ListOrder.create(
    listOrder.map((e) => {
      return e;
    })
  );
  return list.map((e) => e.id);
};
