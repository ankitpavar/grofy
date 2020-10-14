const express = require('express');

const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require ('../middleware/authMiddleware')

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);


module.exports = router