import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";

export const createSubmission = cathcAsync(async (req, res, next) => {
  // Get IDs from request if exists
  if (!req.user) req.body.user = req.user.id;
  if (!req.body.contest) req.body.contest = req.params.contestId;
  if (!req.body.problem) req.body.user = req.params.problemId;

  const submission = await submissionModel.create(req.body);

  res.status(201).json({
    message: "Submission created successfully",
    submission,
  });
});

export const mySubmissions = cathcAsync(async function (req, res, next) {
  // Note: populate is called in query Middleware
  const user = await submissionModel.findOne({ user: req.user.id });

  res.status(200).json({
    meassage: "submissions Showed Successfully",
    user,
  });
});

export const allUsersSubmissions = cathcAsync(async function (req, res, next) {
  // Note: populate is called in query Middleware
  const users = await submissionModel.find();

  res.status(200).json({
    meassage: "submissions Showed Successfully",
    users,
  });
});
