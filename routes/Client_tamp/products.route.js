const express = require("express");

const routes = express.Router();
const controller = require("../../controllers/client/products.controller");

routes.get("/", controller.index);
routes.get("/:slug", controller.detail);

module.exports = routes;
