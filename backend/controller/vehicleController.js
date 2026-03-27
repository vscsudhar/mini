const vehicleModel = require('../model/vehicleModel');

// GET vehicles API = /api/v1/vehicles
exports.getVehicles = async (req, res) => {
    try {
         const products = await  vehicleModel.find();

    res.json({
        status: res.statusCode,
        success: true,
        products
    })
    } catch (e) {
        res.json({
            status: res.statusCode,
            success: false,
            message: e.message
        })

    }
}


//create vehicles API =/api/v1/vehicle-create
exports.createVehicle = async (req, res) => {
    try {
        console.log(req.body);
            const vehicle = await vehicleModel.create(req.body);
            res.status(201).json({
                success: true,
                vehicle
            })
        } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    
    }
}
 //update vehicles API = /api/v1/vehicle-update
exports.updateVehicle = async (req, res) => { 
    try {
         const vehicle = await vehicleModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json({
        success: true,
        vehicle
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    
    }
}

 //delete vehicles API = /api/v1/vehicle-delete
exports.deleteVehicle = async (req, res) => { 
    try {
        const vehicle = await vehicleModel.findByIdAndDelete(req.params.id); // ✅

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vehicle deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

