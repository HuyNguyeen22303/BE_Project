// {GET} /admin/products
const product = require("../../models/product.model");
const fillterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");

module.exports.index = async (req, res) => {

    // lọc trạng thái 
    let filterStatus = fillterStatusHelper(req.query);
    // console.log(filterStatus);
    // ENd lọc trạng thái 









    let find = {
        deleted: false

    };


    if (req.query.status) {
        find.status = req.query.status
    }



    // 3. TÌM KIẾM (Nếu có ?keyword=...) Tối ưu 
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.name = objectSearch.regex;
    }




    const products = await product.find(find);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}