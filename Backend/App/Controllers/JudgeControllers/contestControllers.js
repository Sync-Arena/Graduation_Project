import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";

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

  problems = JSON.parse(problems);
  if (!problems)
    next(new AppError("The contest must have at least one problem", 400));

  if (isNaN(durationInMinutes))
    next(new AppError("The duration must be a positive number", 400));

  durationInMinutes = Number(durationInMinutes);

  const newContest = await Contest.create({
    contestName,
    description,
    startTime,
    durationInMinutes,
    paticipatedUsers,
  });
  resGen(res, 201, "success", "The contest has been created", newContest);
});

/*

1- add problem
2- delete problem
3- 


*/
