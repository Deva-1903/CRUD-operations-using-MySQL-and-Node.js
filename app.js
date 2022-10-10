const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mySql = require("mysql2");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

//Template engine
const handleBars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handleBars.engine);
app.set("view engine", "hbs");

const routes = require("./server/routes/customer");
app.use("/", routes);

// listen
app.listen(port, () => {
  console.log("listening on port " + port);
});
