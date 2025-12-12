const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

route(app);
routeAdmin(app);
// App local Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
