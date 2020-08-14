require("dotenv").config();
require("./server/db-connection");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./client/build/"));
app.use("/api/thoughts/", require("./server/routes/reviews"));
app.get("/*", (req, res) => {
  res.sendfile("index.html", { root: __dirname + "/client/build/" })
});
const { PORT } = process.env;
app.listen(PORT);