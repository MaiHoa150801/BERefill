const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const ListOrder = require('../models/listOrderModel');
const Order = require('../models/OrderModel');
const { userUseVoucher } = require('./VoucherController');

exports.getUserOrder = asyncErrorHandler(async (req, res, next) => {
  const listOrder = await Order.find({
    account_id: req.params.account_id,
    status: req.params.status,
  })
    .populate({
      model: 'ListOrder',
      path: 'list_order_id',
      populate: { model: 'Product', path: 'product' },
    })
    .populate({
      model: 'Salesperson',
      path: 'salesperson_id',
    })
    .populate({
      model: 'Voucher',
      path: 'voucher_id',
    });
  res.status(200).json({
    success: true,
    listOrder,
  });
});

exports.getAllOrderStatus = asyncErrorHandler(async (req, res, next) => {
  console.log(req.query.status);
  const Orders = await Order.find({
    status: req.query.status,
  });
  res.status(200).json({
    success: true,
    Orders,
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
  if (req.body.voucher_id) {
    await userUseVoucher(req.body.account_id, req.body.voucher_id);
  }
  const list = await createListOrder(req.body.list_order);
  req.body.list_order_id = list;
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
