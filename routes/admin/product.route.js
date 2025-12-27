const express = require("express");
const routes = express.Router();
const multer = require('multer');

const validate = require("../../validates/admin/productValidate.js");
const upload = multer();
const controller = require("../../controllers/admin/product.controller");
const  uploadCloud = require("../../middlewares/admin/uploadCloudinary.middlewares.js");

routes.get("/", controller.index);
routes.patch("/change-status/:status/:id", controller.changeStatus);
routes.patch("/change-multi", controller.changeMutil);
routes.delete("/delete/:id", controller.deleteItem);
routes.get("/create", controller.create);
routes.post(
  "/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

routes.get("/restore", controller.trash);

routes.patch("/restore/:id", controller.restoreItem);

routes.delete("/delete-permanent/:id", controller.deletePermanent);

routes.get("/edit/:id", controller.edit);
routes.patch(
  "/edit/:id",
  upload.single('thumbnail'),
  validate.createPost,
  controller.editPatch
);


routes.get("/detail/:id", controller.detail);



module.exports = routes;