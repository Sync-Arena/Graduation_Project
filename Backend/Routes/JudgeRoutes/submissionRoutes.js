import express from "express";
import {
  allUsersSubmissions,
  createSubmission,
} from "../../App/Controllers/JudgeControllers/submissionControllers.js";
import {
  submit,
  inContest,
  preSubmiting
} from "../../App/MiddleWare/Judge/submissionMiddleware.js";

const submissionRouter = express.Router({ mergeParams: true });

submissionRouter.get("/all-submissions", allUsersSubmissions);

// submissionRouter
//   .route("/:contestId/:problemId")
//   .post(submit, createSubmission);

submissionRouter.route("/submit").post(inContest, submit,preSubmiting ,createSubmission);

export default submissionRouter;
