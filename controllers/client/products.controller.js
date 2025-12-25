const product = require("../../models/product.model");
// {GET} /products
module.exports.index = async (req, res) => {
  const products = await product.find({

    status: "active",
    deleted: false,
  }).sort({
    position: "desc"
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



// {GET} /products/:slug
module.exports.detail = async (req, res) => {



  try {
    const find = {
      slug: req.params.slug,
      status: "active",
      deleted: false
    }

    const products = await product.findOne(find);
    console.log(products);
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      products: products,
    });
  } catch (error) {
    res.redirect(`/products`);
  }





  




};