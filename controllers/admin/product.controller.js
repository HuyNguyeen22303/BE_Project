const product = require("../../models/product.model");
const fillterStatusHelper = require("../../helper/fillterStatus");
// {GET} /admin/products
module.exports.index = async (req, res) => {

    // lọc trạng thái 
    let filterStatus = fillterStatusHelper(req.query);
    console.log(filterStatus);
    // ENd lọc trạng thái 









    let find = {
        deleted: false

    };


    if (req.query.status) {
        find.status = req.query.status
    }



    // 3. TÌM KIẾM (Nếu có ?keyword=...)
    let keyword = req.query.keyword;
    if (req.query.keyword) {
        const regex = new RegExp(keyword, "i");
        find.name = regex;
    }


    const products = await product.find(find);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
}