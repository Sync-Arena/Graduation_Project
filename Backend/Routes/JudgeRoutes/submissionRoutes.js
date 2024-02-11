import express from "express";
import {
  allUsersSubmissions,
  submit,
  mySubmissions,
} from "../../App/Controllers/JudgeControllers/submissionControllers.js";
import { checkProblemStatus } from "../../App/MiddleWare/Judge/submissionMiddleware.js";

const submissionRouter = express.Router({ mergeParams: true });

submissionRouter.get("/user-submissions", mySubmissions);
submissionRouter.get("/all-submissions", allUsersSubmissions);

submissionRouter
  .route("/:contestId/:problemId")
  .post(checkProblemStatus, createSubmission);

submissionRouter.route("/submit").post(submit);

export default submissionRouter;
