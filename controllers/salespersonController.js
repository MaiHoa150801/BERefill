const Salesperson = require('../models/SalespersonModel');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const path = require('path');
const Resize = require('../root/Resize');
const cloudinary = require('cloudinary');
const ValidatePhone = require('../utils/validatePhone');

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
  id = User.findById(req.params.id);
  console.log(id);
  account_id = req.user.id;
  console.log(account_id);
  const file = req.files.logo;
  console.log(file);
  const { name, email, phone_number, address, latitude, longitude, description } = req.body;

  const myLogo = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "Logo",
    resource_type: "auto"
  });

  req.body.logo = {
    public_id: myLogo.public_id,
    url: myLogo.secure_url
  }
  
  const isValidatePhone = await ValidatePhone(phone_number);

  if (!isValidatePhone) {
    return next(new ErrorHandler(' Số điện thoại không đúng', 401));
  }
  // if (req.files) {
  //   const imagePath = path.join(__dirname, '../images/salesperson');
  //   const fileUpload = new Resize(imagePath, req.files.logo.name);
  //   const fileUrl = await fileUpload.save(req.files.logo.data);
  //   req.body.logo = fileUrl;
  // }

  const salespersons = await Salesperson.create({
    name,
    email,
    phone_number,
    address,
    latitude,
    longitude,
    description,
    account_id
  });

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
