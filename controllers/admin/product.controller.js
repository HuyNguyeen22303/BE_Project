const product = require("../../models/product.model");
// {GET} /admin/products
module.exports.index = async (req, res) => {

    // lọc trạng thái 
    let filterStatus = [{
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng Hoạt động",
            status: "inactive",
            class: ""
        }
    ];

    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

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