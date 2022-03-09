const express = require('express');
const {
  createVoucher,
  userSaveVoucher,
  getAllVoucher,
  getVoucher,
  updateVoucher,
  deleteVoucher,
} = require('../controllers/VoucherController');
const router = express.Router();

router.route('/vouchers/all').get(getAllVoucher);
router.route('/vouchers').get(getVoucher);
router.route('/vouchers').post(createVoucher);
router.route('/vouchers/:id').delete(deleteVoucher);
router.route('/vouchers/:id').put(updateVoucher);
router.route('/vouchers/usersave').post(userSaveVoucher);

module.exports = router;
