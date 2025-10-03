const express = require("express");
const userController = require("../controllers/userController");

const user = express.Router();

user.post("/register", userController.register);
user.post("/login", userController.login);

module.exports = user;
