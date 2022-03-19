const express = require('express');
const {
  createOrder,
  getUserOrder,
  getAllOrderStatus,
} = require('../controllers/orderController');
const router = express.Router();
router.post('/orders', createOrder);
router.get('/orders/:account_id/:status', getUserOrder);
router.get('/orders/status', getAllOrderStatus);
module.exports = router;
