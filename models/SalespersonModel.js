const mongoose = require('mongoose');

const salespersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    min: 10,
    max: 12,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  account_id: {
    type: Number,
    required: true,
  },
  list_product: {
    type: Array,
    default: [],
  },
  logo: {
    type: String,
    required: true,
  },
});
salespersonSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Salesperson', salespersonSchema);
