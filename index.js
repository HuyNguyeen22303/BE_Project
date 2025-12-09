const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const mongoose = require('mongoose');
const route = require("./routes/client/index.route");

mongoose.connect("mongodb://localhost:27017/");
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));



route(app);



app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)


})