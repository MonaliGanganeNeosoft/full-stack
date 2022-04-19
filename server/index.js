const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const mongoDB = require("./mongoose/mongooseConnection");
const PORT = 7000;

const addApi = require("./routes/addApi");
const getApi = require("./routes/getApi");

mongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/add", addApi);
app.use("/get", getApi);

app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`wORKING ON PORT ${PORT}`);
});
