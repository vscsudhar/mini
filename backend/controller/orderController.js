const Order = require('../model/orderModel');
const Cart = require('../model/cartModel');
const Product = require('../model/productModel');
const { generateInvoiceHTML } = require('../utils/invoiceTemplate');

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let total = 0;
        let orderItems = [];

        // ✅ validate & reduce stock
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} out of stock`
                });
            }

            product.stock -= item.quantity;
            await product.save();

            // ✅ FIX: use salePrice instead of price
            const price = product.salePrice ?? product.mrp ?? 0;

            total += price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: price
            });
        }

        // ✅ Safety check
        if (isNaN(total)) {
            return res.status(500).json({
                success: false,
                message: "Error calculating total amount"
            });
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount: total
        });

        // ✅ clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('user');

    res.json({
        success: true,
        orders
    });
};

exports.getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json({
        success: true,
        orders
    });
};

exports.getOrderDetails = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user')
        .populate('items.product');

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    res.json({
        success: true,
        order
    });
};


exports.updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    order.status = req.body.status;
    await order.save();

    res.json({
        success: true,
        order
    });
};

exports.getInvoice = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('items.product')
        .populate('user');

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    const html = generateInvoiceHTML(order);

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
};
