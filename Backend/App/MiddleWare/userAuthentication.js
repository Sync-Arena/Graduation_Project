import userModel from "../../Database/Models/userModels.js";
import { cathcAsync } from "../Controllers/errorControllers/errorContollers.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../../util/appError.js";
import validator from "validator";

const generateToken = function (id) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRED,
  });
};

export const signUp = cathcAsync(async function (req, res, next) {
  const user = await userModel.create(req.body);
  const token = generateToken(user._id);
  res.status(201).json({
    apiStatus: "Success",
    message: "user created successfully",
    token,
  });
});

export const signIn = cathcAsync(async function (req, res, next) {
  const { userNameOrEmail, password } = req.body;

  // 1) check if email and password exists
  if (!userNameOrEmail || !password)
    return next(new AppError("Missing userName or Email or password", 400));

  // 2) Find the user with that email or userName
  let query;
  if (validator.isEmail(userNameOrEmail))
    query = userModel.findOne({ email: userNameOrEmail });
  else query = userModel.findOne({ userName: userNameOrEmail });
  const user = await query.select("+password");

  if (!user) return next(new AppError("User not found", 401));

  // 3) check if password mathches with the password stored in DB
  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect Password", 401));

  // 4) Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    apiStatus: "Success",
    message: "Logged in successfully",
    token,
  });
});

export const userAuth = async function (req, res, next) {
  // 1) Extract token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("Invalid Token !!", 400));

  // 2) verify token
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

  // 3) Find the user of that token
  const user = await userModel.findById(decoded.id);

  if (!user) return next(new AppError("Error in Authentication!!", 401));

  // 4) check if the user changed his password
  if (user.passwordChangedAfter(decoded.iat))
    return next(
      new AppError(
        "user has recently changed his password , please log again !",
        401
      )
    );

  // 5) store token and the user in the request
  req.token = token;
  req.user = user;

  // Move to the next Middleware
  next();
};

export const changePassword = cathcAsync(async function (req, res, next) {
  const { pass, newPass, newPassConfirm } = req.body;

  if (!pass || !newPass || !newPassConfirm)
    return next(
      new AppError(
        "Missing on of the values : (New password || Old Password || Confirm password)",
        400
      )
    );

  // get user data stored in the request
  const user = await userModel.findById(req.user._id).select("+password");

  // check if the password is correct
  if (!(await user.correctPassword(pass, user.password)))
    return next(new AppError("Incorrect Password", 400));

  // save new password (check validity from DB Schema)
  user.password = newPass;
  user.passwordConfirm = newPassConfirm;

  // change the last time the user has changed his password
  user.changedPasswordAt = new Date();

  // save new user information (It will run .pre and and validation in user shcema)
  await user.save();

  res.status(200).json({
    status: "Success",
    message: "Password changed successfully",
  });
});
