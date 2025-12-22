const express = require("express");
const routes = express.Router();
const controller = require("../../controllers/admin/product.controller");

routes.get("/", controller.index);
routes.patch("/change-status/:status/:id", controller.changeStatus);
routes.patch("/change-multi", controller.changeMutil);
routes.delete("/delete/:id", controller.deleteItem);
routes.get("/create", controller.create);
routes.post("/create", controller.createPost);

module.exports = routes;