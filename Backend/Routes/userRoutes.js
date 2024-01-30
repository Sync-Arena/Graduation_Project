import express from "express";

import {
  addUser,
  deleteAllUsers,
  deleteUser,
  getUserStatistics,
  showAllUsers,
  showSingleUser,
} from "../App/Controllers/userControllers/userControllers.js";

import {
  signUp,
  signIn,
  userAuth,
  changePassword,
} from "../App/MiddleWare/userAuthentication.js";

import { admiAuth } from "../App/MiddleWare/adminAuthentication.js";
import { checkUserID } from "../App/MiddleWare/helper.js";

const userRouter = express.Router();

// Routes allowed only for admins
userRouter
  .route("/")
  .get(userAuth, admiAuth("admin"), showAllUsers)
  .post(userAuth, admiAuth("admin"), addUser)
  .delete(userAuth, admiAuth("admin"), deleteAllUsers);

userRouter.get(
  "/showstatistics",
  userAuth,
  admiAuth("admin"),
  getUserStatistics
);

userRouter
  .route("/:id")
  .get(userAuth, admiAuth("admin"), showSingleUser)
  .patch(userAuth, admiAuth("admin"), deleteUser);

// Routes allowed for any user
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/changepassword", userAuth, changePassword);

export default userRouter;
