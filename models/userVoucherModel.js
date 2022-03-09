const mongoose = require('mongoose');

const userVoucherSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
  },
  list_voucher_id: {
    type: Array,
    default: [],
  },
  list_voucher_used: {
    type: Array,
    default: [],
  },
});
userVoucherSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('UserVoucher', userVoucherSchema);
