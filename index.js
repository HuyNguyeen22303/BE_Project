const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const route = require("./routes/client/index.route"); // client

const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(methodOverride('_method'));



// --- CÁCH 2: Dùng Built-in của Express (Mới - Khuyên dùng) --- lưu ý hai dùng này phải để trc route(app)

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json())


route(app);
routeAdmin(app);


// App local Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});