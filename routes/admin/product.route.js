const express = require("express");
const routes = express.Router();
const multer = require('multer');
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");

routes.get("/", controller.index);
routes.patch("/change-status/:status/:id", controller.changeStatus);
routes.patch("/change-multi", controller.changeMutil);
routes.delete("/delete/:id", controller.deleteItem);
routes.get("/create", controller.create);
routes.post(
  "/create",upload.single('thumbnail'), 
  controller.createPost
);

routes.get("/restore", controller.trash);

routes.patch("/restore/:id", controller.restoreItem);

routes.delete("/delete-permanent/:id", controller.deletePermanent);

module.exports = routes;