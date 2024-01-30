import userModel from "../../Database/Models/userModels.js";
import { cathcAsync } from "../Controllers/errorControllers/errorContollers.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import AppError from "../../util/appError.js";
import validator from "validator";
import { sendEmail } from "../../util/email.js";
import crypto from "crypto";

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
  createSendToken(user, 200, res);
});

export const userAuth = cathcAsync(async function (req, res, next) {
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
});

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

export const forgotPassword = cathcAsync(async function (req, res, next) {
  // check if the user enters his email
  const { email } = req.body;
  if (!email) return next(new AppError("please , enter your email", 400));

  // find user
  const user = await userModel.findOne({ email });
  if (!user) return next(new AppError("user not found !!", 404));

  // Generate Random reset token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your 
  new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget 
  your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

export const resetPassword = cathcAsync(async function (req, res, next) {
  // Extract Token
  const resetToken = req.params.token;

  // Hashing Token
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find user with that token and make sure it's not expired
  const user = await userModel.findOne({ passwordResetToken });

  if (!user) return next(new AppError("user not found !!", 404));

  if (!(user.passwordResetExpires > new Date()))
    return next(new AppError("This token is expired", 400));

  // Remove both filed from DB
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // change password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  res.status(200).json({
    status: "Success",
    message: "Password changed successfully",
  });
});
