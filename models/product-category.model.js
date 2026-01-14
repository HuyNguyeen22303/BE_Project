const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
  name: String,
  parent_id : {
    type : String,
    default : ""
  },
  thumbnail: String,
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
const productCategory = mongoose.model("productCategory", productCategorySchema, "products-category");

module.exports = productCategory;