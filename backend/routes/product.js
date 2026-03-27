const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controller/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.post('/product-create', isAuthenticated,  createProduct);
router.get('/products', isAuthenticated,  getProducts);
router.get('/product/:id', isAuthenticated,  getSingleProduct);
router.put('/product-update/:id', isAuthenticated,  updateProduct);
router.delete('/product-delete/:id', isAuthenticated,  deleteProduct);



module.exports = router;
