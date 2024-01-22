import User from "../App/controllers/userControllers.js";
import {userAuth}  from "../App/middleware/userMiddleware.js";
import express from "express";
const router = express.Router();

// actions with no authentications
router.post("/signup", User.signUp);
router.post("/login", User.logIn);

// actions for user authentications

router.post("/logout", userAuth, User.logOut);
router.delete("/deleteAcc", userAuth, User.deleteAcc);
router.post("/changepassword", userAuth, User.changePassword);

export default router;
