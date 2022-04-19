const mongoose = require("mongoose");
const database = "mongodb://localhost:27017/jeNeo";

const connectDB = async () => {
  try {
    await mongoose.connect(database, { useNewUrlParser: true });
    console.log("Mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDB;
