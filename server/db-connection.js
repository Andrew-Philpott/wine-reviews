const mongoose = require("mongoose");
const db = "mongodb://127.0.0.1:27017/mydb";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(console.error);
