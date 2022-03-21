const express = require('express');
const {
  createOrder,
  getUserOrder,
  getAllOrderStatus,
  updateOrder,
  getShipperOrder,
  getOrderByID,
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.post('/orders', isAuthenticatedUser, createOrder);
router.get('/orders/:status', isAuthenticatedUser, getUserOrder);
router.get('/orders/status', getAllOrderStatus);
router.put(
  '/orders/:id',
  isAuthenticatedUser,
  authorizeRoles('shipper', 'admin'),
  updateOrder
);
router.get(
  '/orders/shipper',
  isAuthenticatedUser,
  authorizeRoles('shipper'),
  getShipperOrder
);
router.get('/order/:id', isAuthenticatedUser, getOrderByID);

module.exports = router;
