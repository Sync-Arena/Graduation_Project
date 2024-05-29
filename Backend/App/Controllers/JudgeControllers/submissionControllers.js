import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";

export const createSubmission = cathcAsync(async function (req, res, next) {
  console.log(req.submissionModel)
  const submission = await submissionModel.create(req.submissionModel);
  /// update the number of users to solve the problem in problem schema ===> to be done
  // check if the problem is solved before from user-contest relation
  res.status(201).json({
    message: "Submission created successfully",
    submission,
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
//2024-05-24T18:23:37.066Z