const express = require("express");
const multer = require('multer');
const routes = express.Router();


const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category-validate.js");

const  uploadCloud = require("../../middlewares/admin/uploadCloudinary.middlewares.js");


routes.get("/", controller.index);
routes.get("/create", controller.create);

routes.post(
  "/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);


module.exports = routes;