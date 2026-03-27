const cartModel = require('../model/cartModel');
const Product = require('../model/productModel');

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { product, quantity } = req.body;

         const productData = await Product.findById(product);

        if (!productData) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (productData.stock < (quantity || 1)) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock"
            });
        }

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                items: [{ product, quantity }]
            });
        } else {
            const index = cart.items.findIndex(
                item => item.product.toString() === product
            );

            if (index > -1) {
                cart.items[index].quantity += quantity || 1;
            } else {
                cart.items.push({ product, quantity });
            }

            await cart.save();
        }

        res.json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await cartModel.findOne({ user: userId })
            .populate('items.product');

        res.json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.id;

        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};