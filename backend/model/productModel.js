const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String, // e.g. R15, Duke 390
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // 🔗 relation
        required: true
    },
    partNumber: {
        type: String,
        unique: true
    },
    mrp: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    
    stock: {
        type: Number,
        default: 0
    },
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;