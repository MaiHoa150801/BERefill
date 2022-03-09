const Salesperson = require('../models/SalespersonModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const path = require('path');
const Resize = require('../root/Resize');

exports.getAllSalesperson = asyncErrorHandler(async (req, res, next) => {
  const salespersons = await Salesperson.find().populate({
    model: 'Product',
    path: 'list_product',
  });

  res.status(200).json({
    success: true,
    salespersons,
  });
});

exports.getSalesperson = asyncErrorHandler(async (req, res, next) => {
  const salesperson = await Salesperson.find({
    account_id: req.params.account_id,
  }).populate({
    model: 'Product',
    path: 'list_product',
  });
  res.status(200).json({
    success: true,
    salesperson,
  });
});

exports.createSalesperson = asyncErrorHandler(async (req, res, next) => {
  if (req.files) {
    const imagePath = path.join(__dirname, '../images/salesperson');
    const fileUpload = new Resize(imagePath, req.files.logo.name);
    const fileUrl = await fileUpload.save(req.files.logo.data);
    req.body.logo = fileUrl;
  }

  const salespersons = await Salesperson.create(req.body);

  res.status(200).json({
    success: true,
    salespersons,
  });
});
exports.updateSalesperson = asyncErrorHandler(async (req, res, next) => {
  const salesperson = await Salesperson.findById(req.params.id);
  if (!salesperson) {
    return next(new ErrorHandler('Salesperson Not Found', 404));
  }

  if (req.files) {
    const imagePath = path.join(__dirname, '../images/salesperson');
    const fileUpload = new Resize(imagePath, req.files.logo.name);
    const fileUrl = await fileUpload.save(req.files.logo.data);
    req.body.logo = fileUrl;
  }

  const salespersons = await Salesperson.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    salespersons,
  });
});
