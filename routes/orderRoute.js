const express = require('express');
const { socketIOMiddleware } = require('../app');
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

router.get(
  '/orders/shipper/',
  isAuthenticatedUser,
  authorizeRoles('shipper'),
  getShipperOrder
);
router.post('/orders', isAuthenticatedUser, createOrder);
router.get('/orders/:status', isAuthenticatedUser, getUserOrder);
router.get('/orders/status/:status', getAllOrderStatus);

router.put(
  '/orders/:id',
  isAuthenticatedUser,
  authorizeRoles('shipper', 'admin'),
  socketIOMiddleware,
  updateOrder
);

router.get('/order/:id', isAuthenticatedUser, getOrderByID);

module.exports = router;
