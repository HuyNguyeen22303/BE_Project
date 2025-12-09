const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    price: Number,
    discount: Number,
    stock: Number,
    thumbnail: String,
    images: [String],
    specs: {
        screen: String,
        chip: String,
        ram: String,
        storage: String,
        battery: String,
        camera: String,
        weight: String
    },
    description: String,
    status: String,
    deleted: Boolean
});
const product = mongoose.model('product', productSchema, "products");

module.exports = product;