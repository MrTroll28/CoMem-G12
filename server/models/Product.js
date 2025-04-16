const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    priceNow: Number,
    priceOld: Number,
    tagSale: String,
    image: String,
    category: String,
    link: String,
    soldQuantity: Number,
    isNew: Boolean,
    description: String,
    material: String,
    rating: Number,
    inStock: Boolean,
    colors: [String],
    sizes: [String],
    brand: String,
    weight: String,
    dimensions: String,
    season: String,
    careInstructions: String,
});

const Product = mongoose.model('Product', productSchema, 'product');
module.exports = Product;
