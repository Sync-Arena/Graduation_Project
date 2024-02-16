import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";

export const createSubmission = cathcAsync(async function (req, res, next) {
  const submission = await submissionModel.create(req.submissionModel);

  res.status(201).json({
    message: "Submission created successfully",
    submission,
  });
});

export const mySubmissions = cathcAsync(async function (req, res, next) {
  // Note: populate is called in query Middleware
  const submissions = await submissionModel.findOne({ user: req.user._id });

  res.status(200).json({
    meassage: "submissions Showed Successfully",
    submissions,
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
