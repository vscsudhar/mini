const express = require('express');
const { getVehicles, createVehicle, updateVehicle, deleteVehicle } = require('../controller/vehicleController');
const {isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.get('/vehicles', isAuthenticated, authorizeRoles('admin'), getVehicles);
router.post('/vehicle-create', isAuthenticated, authorizeRoles('admin'), createVehicle);
router.put('/vehicle-update/:id', isAuthenticated, authorizeRoles('admin'), updateVehicle);
router.delete('/vehicle-delete/:id', isAuthenticated, authorizeRoles('admin'), deleteVehicle);


module.exports = router;