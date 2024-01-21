const User = require("../App/controllers/user.controllers");
const { userAuth } = require("../App/middleware/user.middle");
const router = require("express").Router();

// actions with no authentications
router.post("/signup", User.signUp);
router.post("/login", User.logIn);

// actions for user authentications

router.post("/logout", userAuth, User.logOut);
router.delete("/deleteAcc", userAuth, User.deleteAcc);
router.post("/changepassword", userAuth, User.changePassword);

module.exports = router;
