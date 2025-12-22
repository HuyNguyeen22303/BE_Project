const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
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
    weight: String,

  },
  description: String,
  status: String,
  slug: {
    type: String,
    slug: "name",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  position: Number
}, {
  timestamps: true
});
const product = mongoose.model("product", productSchema, "products");

module.exports = product;