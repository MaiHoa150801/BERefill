const express = require('express');
const {
  getRatingProduct,
  ratingProduct,
} = require('../controllers/RatingProductController');
const router = express.Router();

router.get('/ratingproduct/:product_id', getRatingProduct);
router.post('/ratingproduct', ratingProduct);

module.exports = router;
