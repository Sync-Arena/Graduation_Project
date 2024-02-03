import { cathcAsync } from "../../Controllers/errorControllers/errorContollers.js";

export const checkProblemStatus = cathcAsync(async function (req, res, next) {
  req.body.targetMinute = "40";
  req.body.verdict = "Accepted";
  console.log(req.body);
  next();
});
