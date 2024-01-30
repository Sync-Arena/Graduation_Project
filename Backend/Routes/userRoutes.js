import express from "express";

import {
  addUser,
  deleteAllUsers,
  deleteUser,
  getUserStatistics,
  showAllUsers,
  showSingleUser,
} from "../App/Controllers/userControllers.js";

import {
  signUp,
  signIn,
  userAuth,
  changePassword,
  logOut,
} from "../App/MiddleWare/userAuthentication.js";

import { admiAuth } from "../App/MiddleWare/adminAuthentication.js";

const userRouter = express.Router();

// Routes allowed for any user
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/changepassword", userAuth, changePassword);
userRouter.get("/logout", userAuth, logOut);

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

export default userRouter;
