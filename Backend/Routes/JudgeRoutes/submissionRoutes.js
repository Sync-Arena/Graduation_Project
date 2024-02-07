import express from "express";
import {
  allUsersSubmissions,
  createSubmission,
  mySubmissions,
} from "../../App/Controllers/JudgeControllers/submissionControllers.js";
import { checkProblemStatus } from "../../App/MiddleWare/Judge/submissionMiddleware.js";

const submissionRouter = express.Router({ mergeParams: true });

submissionRouter.get("/user-submissions", mySubmissions);
submissionRouter.get("/all-submissions", allUsersSubmissions);

submissionRouter
  .route("/:contestId/:problemId/submissions")
  .post(checkProblemStatus, createSubmission);

export default submissionRouter;
