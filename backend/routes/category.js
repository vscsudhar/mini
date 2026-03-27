const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controller/categoryController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');


const router = express.Router();

router.get('/categories', isAuthenticated, authorizeRoles('admin'), getCategories);
router.post('/category-create', isAuthenticated, authorizeRoles('admin'), createCategory);
router.put('/category-update/:id', isAuthenticated, authorizeRoles('admin'), updateCategory);
router.delete('/category-delete/:id', isAuthenticated, authorizeRoles('admin'), deleteCategory);



module.exports = router;

