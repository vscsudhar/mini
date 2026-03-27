const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    getAllUsers,
    updateUserRole,
    deleteUser
} = require('../controller/userController');

const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Auth
router.post('/register', registerUser);
router.post('/login', loginUser);

// User
router.get('/users/me', isAuthenticated, getProfile);
router.put('/users/me', isAuthenticated, updateProfile);
router.delete('/users/me', isAuthenticated, deleteProfile);

// Admin
router.get('/admin/users', isAuthenticated, authorizeRoles('admin'), getAllUsers);
router.put('/admin/users/:id', isAuthenticated, authorizeRoles('admin'), updateUserRole);
router.delete('/admin/users/:id', isAuthenticated, authorizeRoles('admin'), deleteUser);

module.exports = router;