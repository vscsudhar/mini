const mongoose = require('mongoose');
const slugify = require('slugify'); // ✅ import here

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// ✅ ADD THIS HERE (before model export)
categorySchema.pre('save', function() {
    this.slug = slugify(this.name, { lower: true });
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;