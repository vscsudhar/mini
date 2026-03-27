const express = require('express');
const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart
} = require('../controller/cartController');

const { isAuthenticated } = require('../middleware/auth');


router.post('/cart/add',isAuthenticated, addToCart);
router.get('/cart',isAuthenticated, getCart);
router.delete('/cart/:id',isAuthenticated, removeFromCart);

module.exports = router;