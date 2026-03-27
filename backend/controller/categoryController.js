const categoryModel = require('../model/categoryModel');
const slugify = require('slugify');

// GET categories
exports.getCategories = async (req, res) => { 
    try {
        const categories = await categoryModel.find();

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//create
exports.createCategory = async (req, res) => { 
    try {
        console.log("API HIT", req.body);

        const existing = await categoryModel.findOne({
            name: { $regex: `^${req.body.name}$`, $options: 'i' }
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        req.body.slug = slugify(req.body.name, { lower: true });
        console.log("API HIT", req.body);


        const category = await categoryModel.create(req.body);
        console.log("API HIT", category);


        res.status(201).json({
            success: true,
            category
        });

    } catch (error) {
            console.log("REAL ERROR 👉", error); // ✅ ADD THIS

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE category
exports.updateCategory = async (req, res) => {
    try {
        // ✅ update slug manually
        if (req.body.name) {
            req.body.slug = slugify(req.body.name, { lower: true });
        }

        const category = await categoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true // ✅ important
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE category
exports.deleteCategory = async (req, res) => { 
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};