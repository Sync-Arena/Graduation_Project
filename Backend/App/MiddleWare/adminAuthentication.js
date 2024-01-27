import { resGen } from "./helper.js";

export const admiAuth = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return resGen(res, 401, "fail!!", "unauthorized user !!");
    next();
  };
};
