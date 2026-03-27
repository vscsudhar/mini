const User = require('../model/userModel');
const Product = require('../model/productModel');
const Order = require('../model/orderModel');

exports.getDashboard = async (req, res) => {
    try {
        // ✅ counts
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // ✅ revenue (only delivered orders)
        const orders = await Order.find({ status: 'delivered' });

        const totalRevenue = orders.reduce((sum, order) => {
            return sum + order.totalAmount;
        }, 0);

        // ✅ recent orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user');

        res.json({
            success: true,
            dashboard: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                recentOrders
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};