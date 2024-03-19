import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";

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
  resGen(
    res,
    200,
    "success",
    "The problem has been deleted from the contest",
    contest
  );
});

export const AllSubmissionsOfContest = cathcAsync(async (req, res, next) => {
  const { contestId } = req.body;

  if (!contestId) next(new AppError("Contest Id missing", 400));

  const submissions = await submissionModel.find({ contest: contestId });
  resGen(res, 200, "success", "All submissions of the contest", submissions);
});

export const UserSubmissionsInContest = cathcAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { contestId } = req.body;

  if (!contestId) next(new AppError("Contest Id missing", 400));

  const submissions = await submissionModel.find({
    user: userId,
    contest: contestId,
  });
  resGen(res, 200, "success", "Your submissions in the contest", submissions);
});

// Controller function to register user for a contest
export const registerForContest = cathcAsync(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { contestId } = req.body;

    const contest = await Contest.findById(contestId);

    if (!contest) next(new AppError("Contest not found", 400));

    
    const updated = await Contest.findByIdAndUpdate(
      contestId,
      { $push: { paticipatedUsers: userId } },
      { new: true }
    );

    resGen(res, 200, "success", "User registered for the contest");
  } catch (error) {
    throw new AppError(`Error registering user for contest:${error}`);
  }
});

// Controller function to cancel user registration for a contest
export const cancelContestRegistration = cathcAsync(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { contestId } = req.body;

    const contest = await Contest.findById(contestId);

    if (!contest) next(new AppError("Contest not found", 400));

    const updated = await Contest.findByIdAndUpdate(
      contestId,
      { $pull: { paticipatedUsers: userId } },
      { new: true }
    );

    resGen(res, 200, "success", "User registration canceled for the contest");
  } catch (error) {
    throw new AppError(
      `Error canceling user registration for contest:${error}`
    );
  }
});
/*

1- add problem
2- delete problem
3- 


*/
