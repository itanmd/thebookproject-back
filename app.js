const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRouter = require("./routes/api/api")
const imgRouter = require("./routes/imgs/imgs")
const cors = require('cors')
require("dotenv").config();


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use("/api",apiRouter)
app.use("/imgs", imgRouter)

module.exports = app;
