const productModel = require('../model/productModel');

// GET products API = /api/v1/products
exports.getProducts = async (req, res) => {
    try {
        let query = {};

        // 🔍 Filters
        if (req.query.model) {
            query.model = req.query.model;
        }

        if (req.query.brand) {
            query.brand = req.query.brand;
        }

        if (req.query.partNumber) {
            query.partNumber = req.query.partNumber;
        }

        // 🔥 search (name)
        if (req.query.search) {
            query.name = {
                $regex: req.query.search,
                $options: 'i'
            };
        }

        const products = await productModel.find(query).populate('category');

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


///create Product 
exports.createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



//get single products
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
            .populate('category');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// update products
exports.updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//delete products
exports.deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Product deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
