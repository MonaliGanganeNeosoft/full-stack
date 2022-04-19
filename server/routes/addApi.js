const express = require("express");
const addApi = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userModel = require("../schema/userModel");
const validateToken = require("../Functions/validateToken");

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

addApi.post("/addUserSocial", async (req, res) => {
  console.log(req.body);
  let insert = await new userModel({
    name: req.body.name,
    email: req.body.email,
  });
  insert.save((err) => {
    if (err) {
      res.send({ error: "Email already exists" });
    } else {
      res.status(201).send({ error: "social user added" });
    }
  });
});

module.exports = addApi;
