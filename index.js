const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const mongoose = require("mongoose");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser'); // Thêm dòng này
const session = require("express-session");
const flash = require('express-flash');

// Routes
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// Config
const database = require("./config/database");
const systemConfig = require("./config/system");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(methodOverride('_method'));

// --- Dùng Built-in của Express (Thay thế body-parser) ---
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Flash & Session
app.use(cookieParser('sadaskhdkasld')); // Cần cài npm install cookie-parser
app.use(session({
  secret: 'secret-key', // Nên thêm secret
  resave: false, // Nên thêm cấu hình này
  saveUninitialized: false, // Nên thêm cấu hình này
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());

// Routes Init
route(app);
routeAdmin(app);

// App local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});