const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "SECRET_KEY",
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    res.json({
        success: true,
        user
    });
};

exports.updateProfile = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true }
    );

    res.json({
        success: true,
        user
    });
};


exports.deleteProfile = async (req, res) => {
    await User.findByIdAndDelete(req.user.id);

    res.json({
        success: true,
        message: "Account deleted"
    });
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();

    res.json({
        success: true,
        users
    });
};


exports.updateUserRole = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
    );

    res.json({
        success: true,
        user
    });
};


exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "User deleted"
    });
};