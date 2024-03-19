import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js";
import userModel from "../../../Database/Models/UserModels/userModels.js";

const createUsersObjects = function (startTime, submissions) {
  const usersSubmissions = {};

  submissions.forEach(async (submission) => {
    const user = await userModel.findById(submission.user.id);
    const name = user.userName;

    const problem = await userModel.findById(submission.problemId);
    const problemName = problem.name;

    let submitObject = {
      time: Math.floor((submission.createdAt - startTime) / (1000 * 60)),
      problemName,
      status: submission.status,
      wholeStatus: submission.wholeStatus,
    };

    if (!usersSubmissions[name]) {
      usersSubmissions[name].penalty = 0;
      usersSubmissions[name].solvedProblems = 0;
      usersSubmissions[name].submissions = [submitObject];

      if (submission.wholeStatus === "Accepted") {
        usersSubmissions[name].penalty += time;
        usersSubmissions[name].solvedProblems++;
      } else usersSubmissions[name].penalty += 10;
    } else {
      if (submission.wholeStatus === "Accepted") {
        usersSubmissions[name].penalty += time;
        usersSubmissions[name].submissions.push(submitObject);
        usersSubmissions[name].solvedProblems++;
      } else usersSubmissions[name].penalty += 10;
    }
  });

  return usersSubmissions;
};

const sortUsers = function (usersObjects) {
  const rows = [];

  for (const [key, value] of Object.entries(usersObjects)) {
    rows.push({ userName: key, submissionObject: value });
  }

  rows.sort((obj1, obj2) => {
    const user1 = obj1.submissionObject;
    const user2 = obj2.submissionObject;

    if (user1.solvedProblems < user2.solvedProblems) return 1;
    if (user1.solvedProblems > user2.solvedProblems) return -1;
    if (user1.solvedProblems === user2.solvedProblems) {
      if (user1.penalty > user2.penalty) return 1;
      else return -1;
    }
  });

  return rows;
};

// api => api/v1/Judge/contest
// method : POST
// payload : contestName: String , description: String , problems:Object[problem]

export const createContest = asyncHandler(async (req, res, next) => {
  // problems = JSON.parse(problems);
  // if (!problems)
  //   next(new AppError("The contest must have at least one problem", 400));

  const newContest = await Contest.create({
    ...req.body,
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

export const showStanding = cathcAsync(async function (req, res, next) {
  // find all submission in the contest
  const contest = await contestModel
    .findById(req.params.id)
    .populate("submissions");
  const submissions = contest.submissions;

  const usersObjects = createUsersObjects(contest.startTime, submissions);

  const users = sortUsers(usersObjects);

  res.status(200).json({
    message: "standing showed successfully",
    users,
  });
});
/*

1- add problem
2- delete problem
3- 


*/
