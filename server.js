require("./server/db-connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./client/build/"));
app.use("/api/", require("./server/review-route"));
app.listen(5001);
