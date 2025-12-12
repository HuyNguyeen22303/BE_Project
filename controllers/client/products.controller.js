// {GET} /products
const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await product.find({
    status: "active",
    deleted: false,
  });
  // console.log(products);

  const newProduct = products.map((item) => {
    item.priceNew = ((item.price * (100 - item.discount)) / 100).toLocaleString(
      "vi-VN",
    );
    item.priceOld = item.price.toLocaleString("vi-VN");
    return item;
  });

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProduct,
  });
};