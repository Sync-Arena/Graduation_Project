import userModel from "../../Database/Models/userModels.js";
import AppError from "../../util/appError.js";
import { cathcAsync } from "../Controllers/errorControllers/errorContollers.js";

export const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).json({
    apiStatus,
    message,
    data,
  });
};

export const checkUserID = cathcAsync(async function (req, res, next) {
  const user = await userModel.findById(req.params.id);
  if (!user) return next(new AppError("User not found !!", 404));
  next();
});
