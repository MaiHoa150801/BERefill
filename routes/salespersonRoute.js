const express = require('express');
const {
  getAllSalesperson,
  createSalesperson,
  updateSalesperson,
  getSalesperson,
} = require('../controllers/salespersonController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.get('/salespersons', getAllSalesperson);
<<<<<<< HEAD
router.get('/salesperson/:account_id', getSalesperson);
=======
router.get('/salesperson/:account_id', isAuthenticatedUser, getSalesperson);
>>>>>>> f437f82 (voucher api done)
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
