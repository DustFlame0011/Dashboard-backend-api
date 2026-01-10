import express from "express";

import {
  getAllUsers,
  createUser,
  getUserInfoById,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserInfoById);

export default userRouter;
