const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.isAuthenticated = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login required"
            });
        }

        // verify token
        const decoded = jwt.verify(token, "SECRET_KEY");

        // get user from DB
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user; // attach user

        console.log("req.user", req.user);


        next(); // ✅ important

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role (${req.user.role}) not allowed`
            });
        }

        next(); // ✅ important
    };
};