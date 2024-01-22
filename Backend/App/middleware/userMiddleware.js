import jwt from "jsonwebtoken";
import {userModel} from "../../DataBase/models/userModel.js";
import {resGen} from "../helper.js";

export const userAuth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userData = await userModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!userData) throw new Error("Error in authentication");
    req.user = userData;
    req.token = token;
    next();
  } catch (e) {
    resGen(res, 500, false, e.message, null);
  }
};
