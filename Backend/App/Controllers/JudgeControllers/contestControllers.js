import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";

// api => api/v1/Judge/contest
// method : POST
// payload : contestName: String , description: String , problems:Object[problem]

export const createContest = asyncHandler(async (req, res, next) => {
  let {
    contestName,
    description,
    startTime,
    durationInMinutes,
    paticipatedUsers,
    problems,
  } = req.body;

  if (!contestName) next(new AppError("Please add name for the contest", 400));

  if (!startTime)
    next(new AppError("Please add start time for the contest", 400));


  if (isNaN(durationInMinutes))
    next(new AppError("The duration must be a positive number", 400));

  durationInMinutes = Number(durationInMinutes);

  const newContest = await Contest.create({
    contestName,
    description,
    startTime,
    durationInMinutes,
    paticipatedUsers,
    problems,
    createdBy: req.user._id,
  });
  resGen(res, 201, "success", "The contest has been created", newContest);
});

export const addProblem = cathcAsync(async (req, res, next) => {
  const { contestId, problemId } = req.body;
  const contest = await Contest.findByIdAndUpdate(
    contestId,
    { $push: { problems: problemId } },
    { new: true }
  );
  resGen(res, 200, "success", "The problem has been added to contest", contest);
});

export const deleteProblem = cathcAsync(async (req, res, next) => {
  const { contestId, problemId } = req.body;
  const contest = await Contest.findByIdAndUpdate(
    contestId,
    { $pull: { problems: problemId } },
    { new: true }
  );
  resGen(res, 200, "success", "The problem has been deleted from the contest", contest);
});
/*

1- add problem
2- delete problem
3- 


*/
