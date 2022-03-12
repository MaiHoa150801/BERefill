const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();
router.post('/orders', createOrder);

module.exports = router;