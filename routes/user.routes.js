import express from "express";

import {
  getAllUsers,
  createUser,
  getUserInfoByID,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserInfoByID);

export default userRouter;
