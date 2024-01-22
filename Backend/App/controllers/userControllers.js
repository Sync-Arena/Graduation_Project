import { userModel } from "../../DataBase/models/userModel.js";
import {resGen} from "../helper.js";
import bcrypt from "bcrypt";

class User {
  static async signUp(req, res) {
    try {
      const userData = new userModel(req.body);
      await userData.save();
      resGen(res, 200, true, "user added successfully", userData);
    } catch (e) {
      resGen(res, 500, false, "error occured in registeration", e);
    }
  }
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userModel.logMe(email, password);
      const token = await userData.generateToken();
      resGen(res, 200, true, "logged in successfully", { userData, token });
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async logOut(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
      await userModel.findByIdAndUpdate(
        req.user._id,
        {
          tokens: req.user.tokens,
        },
        { runValidators: true }
      );
      resGen(res, 200, true, "logged out successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, req.user);
    }
  }
  static async changePassword(req, res) {
    try {
      const { oldPsw, newPsw, confirmed } = req.body;
      const isCorrectPsw = await bcrypt.compare(oldPsw, req.user.password);
      if (!isCorrectPsw) {
        resGen(res, 500, false, "password is incorrect", null);
        return;
      }
      if (newPsw === confirmed) {
        if (newPsw === oldPsw) {
          resGen(res, 500, false, "this is the same as the old password", null);
          return;
        }
        req.user.password = newPsw;
        req.user.confirmedPassword = newPsw;
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
        await req.user.save();
        resGen(res, 200, true, "password changed successfully", req.user);
        return;
      }
      resGen(res, 500, false, "passwords doesn't matche", null);
    } catch (e) {
      resGen(res, 500, false, e, null);
    }
  }
  static async deleteAcc(req, res) {
    try {
      await userModel.findByIdAndDelete(req.user._id);
      resGen(
        res,
        200,
        true,
        "account deleted successfully",
        "no longer exxists !!"
      );
    } catch (e) {
      resGen(res, 500, false, "error occurred in deleting", req.user);
    }
  }
}

export default User;
