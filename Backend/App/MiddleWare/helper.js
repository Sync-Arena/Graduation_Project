import userModel from "../../Database/Models/userModels.js";
import AppError from "../../util/appError.js";
import { cathcAsync } from "../Controllers/errorContollers.js";

export const resGen = function (res, statusCode, apiStatus, message, data) {
  res.status(statusCode).json({
    apiStatus,
    message,
    data,
  });
};
