const product = require("../../models/product.model");
// {GET} /admin/products
module.exports.index = async (req, res) => {


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











    let find = {
        deleted: false

    };

    if (req.query.status) {
        find.status = req.query.status
    }


    const products = await product.find(find);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus
    })
}