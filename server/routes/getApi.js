const express = require("express");
const getApi = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecretKey = "monimonimoniok";
const userModel = require("../schema/userModel");

getApi.get("/getUser/:email/:password", (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  console.log(email, password);
  userModel.findOne({ email: email }, (err, data) => {
    console.log(data);
    if (err) {
      throw err;
    }
    console.log(data != null);
    if (data != null) {
      if (data.type == "social") {
        res.send({ err: 1, msg: "Login using social media" });
      } else {
        bcrypt.compare(password, data.password, function (err, result) {
          if (err) throw err;
          if (result) {
            let payload = { id: data._id };
            const token = jwt.sign(payload, jwtSecretKey, {
              expiresIn: 1000 * 60 * 60 * 24,
            });
            let responseData = {
              name: data.name,
              email: data.email,
            };
            res.send({
              err: 0,
              responseData: responseData,
              token: token,
              msg: "user get data",
            });
          } else {
            res.send({ err: 1, msg: "enter valid password" });
          }
        });
      }
    } else {
      res.send({ err: 1, msg: "Invalid Email" });
    }
  });
});

module.exports = getApi;
