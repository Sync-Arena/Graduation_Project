import express from "express";
import {
  allUsersSubmissions,
  mySubmissions,
  createSubmission,
} from "../../App/Controllers/JudgeControllers/submissionControllers.js";
import { submit } from "../../App/MiddleWare/Judge/submissionMiddleware.js";

const submissionRouter = express.Router({ mergeParams: true });

submissionRouter.get("/user-submissions", mySubmissions);
submissionRouter.get("/all-submissions", allUsersSubmissions);

// submissionRouter
//   .route("/:contestId/:problemId")
//   .post(submit, createSubmission);

submissionRouter.route("/submit").post(submit, createSubmission);

export default submissionRouter;
