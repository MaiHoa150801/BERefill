const express = require('express');
const {
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getProductReviews,
  deleteReview,
  createProductReview,
  createProduct,
  getAdminProducts,
  getProducts,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.get('/products', getAllProducts);
router.route('/products/all').get(getProducts);

router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('salesperson'), createProduct);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('salesperson'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('salesperson'), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router
  .route('/admin/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
