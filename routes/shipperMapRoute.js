const express = require('express');
const { socketIOMiddleware } = require('../app');
const {
  createShipperMap,
  updateCurrent,
  getShipperMap,
} = require('../controllers/shipperMapController');
const router = express.Router();

router.post('/shippermap', createShipperMap);
router.get('/shippermap/:account_id', socketIOMiddleware, getShipperMap);
router.post('/shippermap/updateCurrent', socketIOMiddleware, updateCurrent);

module.exports = router;
