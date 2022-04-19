const express = require("express");
const addApi = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userModel = require("../schema/userModel");
addApi.post("/addUser", async (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    let insert = await new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    insert.save((err) => {
      if (err) {
        res.send({ err: "Email already exists in database" });
      } else res.status(201).send({ err: "", msg: "success added" });
    });
  });
});

module.exports = addApi;
