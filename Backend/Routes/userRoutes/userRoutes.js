import express from "express";

import {
  addUser,
  deleteAllUsers,
  deleteUser,
  getUserStatistics,
  showAllUsers,
  showSingleUser,
} from "../../App/Controllers/userControllers/userControllers.js";

import {
  signUp,
  signIn,
  userAuth,
  changePassword,
  logOut,
  forgotPassword,
  resetPassword,
} from "../../App/MiddleWare/Authentication/userAuthentication.js";

import { admiAuth } from "../../App/MiddleWare/Authentication/adminAuthentication.js";
import submissionRouter from "../JudgeRoutes/submissionRoutes.js";

const userRouter = express.Router();

// Routes allowed for any user
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/changepassword", userAuth, changePassword);
userRouter.get("/logout", userAuth, logOut);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.patch("/resetpassword/:token", resetPassword);


// Routes allowed only for admins

// Authenticaion & Authorization Middleware
userRouter.use(userAuth, admiAuth("admin"));

userRouter.route("/").get(showAllUsers).post(addUser).delete(deleteAllUsers);
userRouter.get("/showstatistics", getUserStatistics);
userRouter.route("/:id").get(showSingleUser).patch(deleteUser);

export default userRouter;
