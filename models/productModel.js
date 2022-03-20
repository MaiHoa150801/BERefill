const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  sale_price: {
    type: Number,
    default: 0,
  },
  measure: {
    type: String,
    required: true,
  },
  trademark_id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  list_image: {
    type: Array,
    default: [],
  },
  type_product_id: {
    type: Number,
    required: true,
  },
});
productSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Product', productSchema);
