const product = require("../../models/product.model");
const fillterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");
var multer = require('multer');

const storageMulter = require("../../helper/storageMulter");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const upload = multer({
  storage: storageMulter()
});
// {GET} /admin/products
module.exports.index = async (req, res) => {
  // lọc trạng thái
  let filterStatus = fillterStatusHelper(req.query);
  // console.log(filterStatus);
  // ENd lọc trạng thái

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // 3. TÌM KIẾM (Nếu có ?keyword=...) Tối ưu
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.name = objectSearch.regex;
  }



  // pagination

  const countProducts = await product.countDocuments(find);
  let objectPagination = paginationHelper({
      currentPage: 1,
      limitItem: 4
    },
    req.query,
    countProducts

  )


  // End pagination
 
  
 // --- Start Sort ---
let sort = {};

const sortKey = req.query.sortKey || req.query.sortkey;
const sortValue = req.query.sortValue || req.query.sortvalue;

if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
} else {
    
    sort.position = "desc";
}
// --- End Sort ---

  const products = await product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);


  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
};



// {PATCH} /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {

  const status = req.params.status;
  const id = req.params.id;

  await product.updateOne({
    _id: id
  }, {
    status: status
  });

  req.flash('success', 'Cập nhật trạng thái thành công!');
  res.redirect(req.get("Referrer") || "/");

}




// {PATCH} /admin/products/products/change-multi
module.exports.changeMutil = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "active"
      });
      req.flash('success', `${ids.length} sản phẩm đã được cập nhật trạng thái hoạt động`);
      break;
    case "inactive":
      await product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "inactive"
      });
      req.flash('success', `${ids.length} sản phẩm đã được cập nhật trạng thái dừng hoạt động`);
      break;

    case "deleted-all":
      await product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        deleted: true,
        deletedAt: new Date()
      });
      break;

    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await product.updateOne({
          _id: id
        }, {
          position: position
        });
      }

      break;

    default:
      break;
  }
  res.redirect(req.get("Referrer") || "/");

}


// {DELETE} /admin/products/products/delete-item

module.exports.deleteItem = async (req, res) => {

  const id = req.params.id;
  console.log(id);
  await product.updateOne({
    _id: id,
  }, {
    deleted: true,
    deletedAt: new Date()
  })



  res.redirect(req.get("Referrer") || "/");

}




// {GET} /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",

  });
};




// {POST} /admin/products/create
module.exports.createPost = async (req, res) => {


  req.body.price = parseInt(req.body.price);
  req.body.discount = parseInt(req.body.discount);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    countProducts = await product.countDocuments();
    req.body.position = countProducts + 1;

  } else {
    req.body.position = parseInt(req.body.position);
  }






  const products = new product(req.body);
  await products.save();


  res.redirect(`${systemConfig.prefixAdmin}/products`);
};



// {GET} /admin/products/restore
module.exports.trash = async (req, res) => {

  const products = await product.find({
    deleted: true
  });

  res.render("admin/pages/products/restore", {
    pageTitle: "Thùng rác",
    products: products
  });
};



// {PACTH} /admin/products/restore
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;
  req.flash('restore', 'Khôi phục sản phẩm thành công!');
  await product.updateOne({
    _id: id,
  }, {
    deleted: false,
  })



  res.redirect(req.get("Referrer") || "/");
};



// {DELETE} /admin/products/delete-permanent
module.exports.deletePermanent = async (req, res) => {
  req.flash('deletePermanent', 'xóa vĩnh viễn sản phẩm thành công!');
  const id = req.params.id;
  await product.deleteOne({
    _id: id,
  })



  res.redirect(req.get("Referrer") || "/");
};



// {GET} /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }

    const products = await product.findOne(find);
    console.log(products);
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      products: products
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

};



// {PATCH} /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discount = parseInt(req.body.discount);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);




  try {
    await product.updateOne({
      _id: id
    }, req.body);
    req.flash('success', 'Cập nhật sản phẩm thành công!');
  } catch (error) {
    req.flash('error', 'Cập nhật sản phẩm thất bại!');
  }


  res.redirect(req.get("Referrer") || "/");
};





// {GET} /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }

    const products = await product.findOne(find);
    console.log(products);
    res.render("admin/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      products: products
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

};