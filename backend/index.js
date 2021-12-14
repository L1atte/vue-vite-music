/*
 * @Author: Latte
 * @Date: 2021-12-13 23:05:03
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-14 00:13:01
 * @FilePath: \backend\index.js
 */
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 9002;

const registerRouter = require("./router");

const app = express();

app.use(require("cors")());
registerRouter(app);
app.use(cookieParser());
app.use(compression());
app.use(express.static("./dist"));

app.listen(port, () => {
	console.log("Listening at http://localhost:" + port + "\n");
});
