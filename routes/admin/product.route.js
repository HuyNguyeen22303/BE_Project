const express = require("express");
const routes = express.Router();
const controller = require("../../controllers/admin/product.controller");

routes.get("/", controller.index);

module.exports = routes;
