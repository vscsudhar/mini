const express = require('express');
const router = express.Router();

const {
    placeOrder,
    getAllOrders,
    getMyOrders,
    getOrderDetails,
    updateOrderStatus,
    getInvoice
} = require('../controller/orderController');

const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// USER
router.post('/orders', isAuthenticated, placeOrder);
router.get('/orders/my', isAuthenticated, getMyOrders);

// ADMIN
router.get('/orders', isAuthenticated, authorizeRoles('admin'), getAllOrders);
router.put('/orders/:id/status', isAuthenticated, authorizeRoles('admin'), updateOrderStatus);

// COMMON
router.get('/orders/:id', isAuthenticated, getOrderDetails);
router.get('/orders/:id/invoice', isAuthenticated, getInvoice);




module.exports = router;