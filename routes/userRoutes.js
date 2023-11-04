const express = require("express");
// const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/register", authController.signup);

userRouter.post("/login", authController.login);

module.exports = userRouter;
