const express = require('express');
const {
  getAllSalesperson,
  createSalesperson,
  updateSalesperson,
  getSalesperson,
} = require('../controllers/salespersonController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.get('/salespersons', isAuthenticatedUser, getAllSalesperson);
router.get('/salesperson/:account_id', isAuthenticatedUser, getSalesperson);
router.post(
  '/salespersons',
  isAuthenticatedUser,
  authorizeRoles('salesperson'),
  createSalesperson
);
router.put(
  '/salespersons/:id',
  isAuthenticatedUser,
  authorizeRoles('salesperson'),
  updateSalesperson
);
module.exports = router;
