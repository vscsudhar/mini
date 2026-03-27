const express = require('express');
const router = express.Router();

const { getDashboard } = require('../controller/dashboardController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// ADMIN ONLY
router.get(
    '/dashboard',
    isAuthenticated,
    authorizeRoles('admin'),
    getDashboard
);

module.exports = router;