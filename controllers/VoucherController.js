const Voucher = require('../models/voucherModel');

exports.getVoucher = asyncErrorHandler(async (req, res, next) => {
  const voucher = Voucher.find({
    salesperson_id: req.body.salesperson_id,
    type: 'Admin Voucher',
  });
  res.status(201).json({
    success: true,
    voucher,
  });
});

exports.createVoucher = asyncErrorHandler(async (req, res, next) => {
  const voucher = await Voucher.create(req.body);
  res.status(201).json({
    success: true,
    voucher,
  });
});

exports.updateVoucher = asyncErrorHandler(async (req, res, next) => {
  const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    voucher,
  });
});
exports.updateQuantityVoucher = asyncErrorHandler(async (req, res, next) => {
  const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    voucher,
  });
});
exports.deleteVoucher = asyncErrorHandler(async (req, res, next) => {
  const voucher = Voucher.findById(req.params.id);
  if (!voucher) {
    return next(new ErrorHandler('Voucher Not Found', 404));
  }
  await voucher.remove();

  res.status(201).json({
    success: true,
  });
});
