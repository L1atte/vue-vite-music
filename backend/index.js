/*
 * @Author: Latte
 * @Date: 2021-12-13 23:05:03
 * @LAstEditors: Latte
 * @LastEditTime: 2021-12-18 02:59:26
 * @FilePath: \vue-vite-music\backend\index.js
 */
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const port = 3000;

const registerRouter = require("./router");

const app = express();

app.use(require("cors")());
registerRouter(app);
app.use(cookieParser());
app.use(compression());
app.use("/", express.static("./music"));

app.listen(port, () => {
	console.log("Listening at http://localhost:" + port + "\n");
});
