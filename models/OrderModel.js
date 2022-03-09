const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  list_order_id: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ListOrder',
    },
  ],
  account_id: {
    type: Number,
    required: true,
  },
  voucher: {
    type: mongoose.Types.ObjectId,
    ref: 'Voucher',
  },
  date_created: {
    type: Date,
    default: new Date(),
  },
  total_money: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  salesperson_id: {
    type: Number,
    required: true,
  },
});
orderSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Order', orderSchema);
