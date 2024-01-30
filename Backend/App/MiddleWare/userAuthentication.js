import userModel from "../../Database/Models/userModels.js";
import { cathcAsync } from "../Controllers/errorContollers.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../../util/appError.js";

const createSendToken = async function (user, statusCode, res) {
  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRED,
  });

  const tokens = user.tokens;
  tokens.push(token);
  await userModel.findByIdAndUpdate(
    user.id,
    { tokens },
    { new: true, runValidators: true }
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRED * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;
  // REMOVE Tokens FROM OUTPUT
  user.tokens = undefined;

  res.status(statusCode).json({
    apiStatus: "Success",
    message:
      statusCode === 201
        ? "user created successfully"
        : "Logged in successfully",
    data: user,
    token,
  });
};

export const signUp = cathcAsync(async function (req, res, next) {
  const user = await userModel.create(req.body);
  createSendToken(user, 201, res);
});

export const signIn = cathcAsync(async function (req, res, next) {
  const { userName, password } = req.body;

  // 1) check if email and password exists
  if (!userName || !password)
    return next(new AppError("Missing email or password", 400));

  // 2) Find the user with that email
  const user = await userModel.findOne({ userName }).select("+password");
  if (!user) return next(new AppError("User not found", 401));

  // 3) check if password mathches with the password stored in DB
  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect Password", 401));

  // 4) Generate token
  createSendToken(user, 200, res);
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

  if (!user || !user.tokens.includes(token))
    return next(new AppError("Error in Authentication!!", 401));

  // 4) check if the user changed his password
  if (user.passwordChangedAfter(decoded.iat))
    return next(
      new AppError(
        "user has recently changed his password , please log in again !",
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

export const logOut = cathcAsync(async function (req, res, next) {
  const tokens = req.user.tokens.filter((el) => el !== req.token);
  await userModel.findByIdAndUpdate(
    req.user.id,
    { tokens },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "Success",
    message: "logged out successfully",
  });
});
