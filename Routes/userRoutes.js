const express = require("express");
const usersRoutes = express.Router();
const usersController = require("../Controllers/userController");
//////////////////////////////////////////////
//logInUsers.//
usersRoutes.post("/login", usersController.loginUsers);
//registerUsers.//
usersRoutes.post("/register", usersController.registerUsers);

module.exports = usersRoutes