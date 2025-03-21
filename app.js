const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app
.use(express.json({limit: '50mb'}))
.use(express.urlencoded({ extended: true }));

const apiRouter = require("./src/routes/api.js");
app.use("/api", apiRouter);

module.exports = app;