import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import userModel from "../../../Database/Models/UserModels/userModels.js";
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js";
import { StatusCodes } from "http-status-codes";
import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";
import problemModel from "../../../Database/Models/JudgeModels/ProblemModel.js";

export const createUsersObjects = cathcAsync(async function (req, res, next) {
  const contest = await contestModel
    .findById(req.params.contestId)
    .populate("submissions");

  const submissions = contest.submissions;
  const startTime = contest.startTime;

  const l = submissions.length;
  const usersSubmissions = {};

  submissions.forEach(async (submission, idx) => {
    if (submission.user) {
      const user = await userModel.findById(submission.user._id);
      const name = user.userName;

      const problem = await problemModel.findById(submission.problemId);
      const problemName = problem.name;

      let submitObject = {
        time: submission.isOfficial
          ? Math.floor((submission.createdAt - startTime) / (1000 * 60))
          : submission.createdAt,
        problemName,
        status: submission.status,
        wholeStatus: submission.wholeStatus,
      };

      if (!usersSubmissions[name]) {
        usersSubmissions[name] = {};
        usersSubmissions[name].solvedProblems = 0;
        usersSubmissions[name].submissions = [submitObject];
        usersSubmissions[name].penalty = submission.isOfficial ? 0 : undefined;

        if (submission.wholeStatus === "Accepted") {
          if (submission.isOfficial)
            usersSubmissions[name].penalty += submitObject.time;
          usersSubmissions[name].solvedProblems++;
        } else if (submission.isOfficial) usersSubmissions[name].penalty += 10;
      } else {
        if (submission.wholeStatus === "Accepted") {
          if (submission.isOfficial)
            usersSubmissions[name].penalty += submitObject.time;
          usersSubmissions[name].submissions.push(submitObject);
          usersSubmissions[name].solvedProblems++;
        } else if (submission.isOfficial) usersSubmissions[name].penalty += 10;
      }
      if (idx === l - 1) {
        req.usersSubmissions = usersSubmissions;
        next();
      }
    }
  });
});

export const sortUsers = cathcAsync(async function (req, res, next) {
  const rowsOfficial = [];
  const rowsUnOfficial = [];

  for (const [key, value] of Object.entries(req.usersSubmissions)) {
    value.penalty
      ? rowsOfficial.push({ userName: key, submissionObject: value })
      : rowsUnOfficial.push({ userName: key, submissionObject: value });
  }

  rowsOfficial.sort((obj1, obj2) => {
    const user1 = obj1.submissionObject;
    const user2 = obj2.submissionObject;

    if (user1.solvedProblems < user2.solvedProblems) return 1;
    if (user1.solvedProblems > user2.solvedProblems) return -1;
    if (user1.solvedProblems === user2.solvedProblems) {
      if (user1.penalty > user2.penalty) return 1;
      else return -1;
    }
  });

  rowsUnOfficial.sort((obj1, obj2) => {
    const user1 = obj1.submissionObject;
    const user2 = obj2.submissionObject;
    return user1.solvedProblems < user2.solvedProblems ? 1 : -1;
  });

  req.users = [...rowsOfficial, ...rowsUnOfficial];
  next();
});

export const showStanding = cathcAsync(async function (req, res, next) {
  res.status(200).json({
    status: "Success",
    message: "Standing showed successfully",
    standing: req.users,
  });
});

// api => api/v1/Judge/contest
// method : POST
// payload : contestName: String , description: String , problems:Object[problem]

export const createContest = asyncHandler(async (req, res, next) => {
  let {
    contestName,
    description,
    startTime,
    durationInMinutes,
    participatedUsers,
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
    participatedUsers,
    problems,
    createdBy: req.user._id,
    admins: [req.user._id],
  });
  resGen(res, 201, "success", "The contest has been created", newContest);
});

// Function to generate indices up to a specified count
function generateIndices(count) {
  const indices = [];
  const base = 26;

  for (let i = 0; i < count; i++) {
    let index = "";
    let number = i;

    while (number >= 0) {
      index = String.fromCharCode((number % base) + 65) + index;
      number = Math.floor(number / base) - 1;
    }

    indices.push(index);
  }

  return indices;
}

// Pre-generate a list of indices
const maxIndices = 1000;
const preGeneratedIndices = generateIndices(maxIndices);

// function to push contest Id into exitsIn array inside problem document
const pushContestToExitsIn = async (contestId, problemId, contest) => {
  const arrSize = contest.problems.length;

  await problemModel
    .findByIdAndUpdate(
      problemId,
      {
        $push: {
          existsIn: {
            contestId: contestId,
            IndexInContest: preGeneratedIndices[arrSize - 1],
          },
        },
      },
      { new: true }
    )
    .catch((error) => {
      next(
        AppError(
          `Error while pushing contest ID into the exitsIn array: ${error}`,
          400
        )
      );
    });
};

// function to delte contest Id from exitsIn array inside problem document
const deleteContestFromExitsIn = async (problemId, contestId) => {
  await problemModel
    .findByIdAndUpdate(
      problemId,
      {
        $pull: {
          existsIn: {
            contestId: contestId,
          },
        },
      },
      { new: true }
    )
    .catch((error) => {
      next(
        AppError(
          `Error while deleting contest ID from the exitsIn array: ${error}`,
          400
        )
      );
    });
};

// function to add problem to contest
export const addProblem = cathcAsync(async (req, res, next) => {
	let problemId = req.params.problem
	const { contestId } = req.body

	if (!problemId) return next(new AppError("Problem Id missing", 400))

	const problem = await problemModel.findById(problemId)
	if (!problem)
		return next(new AppError("The problem with current ID does not exist", 400))

	const contest = await Contest.findByIdAndUpdate(
		contestId,
		{ $push: { problems: problemId } },
		{ new: true }
	)

	await pushContestToExitsIn(contestId, problemId, contest)

	resGen(res, 200, "success", "The problem has been added to contest", contest)
})

// function to delte problem from contest
export const deleteProblem = cathcAsync(async (req, res, next) => {
	let problemId = req.params.problem
	const { contestId } = req.body

	if (!problemId) return next(new AppError("Problem Id missing", 400))

	const problem = await problemModel.findById(problemId)

	if (!problem)
		return next(new AppError("The problem with current ID does not exist", 400))

	const contest = await Contest.findByIdAndUpdate(
		contestId,
		{ $pull: { problems: problemId } },
		{ new: true }
	)

	await deleteContestFromExitsIn(problemId, contestId)

	resGen(
		res,
		200,
		"success",
		"The problem has been deleted from the contest",
		contest
	)
})

// {{host}}/api/v1/judge/contest/all-submissions
export const AllSubmissionsOfContest = cathcAsync(async (req, res, next) => {
  let contestId = req.params.contest
  let {  problemId, status, language, userName } = req.body;
  userName = userName ? userName.trim() : userName;
  const filter = {};
  if (!contestId) next(new AppError("Contest Id missing", 400));

  if (problemId) filter.problemId = problemId;
  if (status) filter["status.description"] = status;
  if (language) filter.languageName = language;
  if (userName) {
    const user = await userModel.findOne({ userName: userName });
    if (user) filter.user = user._id;
    else next(new AppError("User does not exit", 400));
  }

  const submissions = await submissionModel.find({
    contest: contestId,
    ...filter,
  });
  resGen(res, 200, "success", "All submissions of the contest", submissions);
});

// {{host}}/api/v1/judge/contest/my-submissions
export const UserSubmissionsInContest = cathcAsync(async (req, res, next) => {
  let contestId = req.params.contest
  const userId = req.user._id;
  const { problemId, status, language } = req.body;
  const filter = { user: userId };

  if (!contestId) next(new AppError("Contest Id missing", 400));

  if (problemId) filter.problemId = problemId;
  if (status) filter["status.description"] = status;
  if (language) filter.languageName = language;

  const submissions = await submissionModel.find({
    contest: contestId,
    ...filter,
  });
  resGen(res, 200, "success", "Your submissions in the contest", submissions);
});

// Controller function to register user for a contest
export const registerForContest = cathcAsync(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { contestId } = req.body;

    const contest = await Contest.findById(contestId);

    if (!contest) return next(new AppError("Contest not found", 400));

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

    if (!contest) return next(new AppError("Contest not found", 400));

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

export const addAdminToContest = asyncHandler(async (req, res, next) => {
  const { userId, contestId } = req.body;
  if (!userId) next(new AppError("Please provide a user ID", 404));

  let isUserExist;
  try {
    isUserExist = await userModel.findById(userId);
  } catch (err) {
    next(new AppError("User not found", 404));
  }
  if (!isUserExist) next(new AppError("User not found", 404));

  let admins;
  try {
    admins = await contestModel.findByIdAndUpdate(
      contestId,
      {
        $addToSet: { admins: userId },
      },
      { new: true }
    );
  } catch (err) {
    next(
      new AppError(
        "SomeThing went wrong. try again latter..",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.json({ success: true, admins });
});

export const removeAdminFromContest = asyncHandler(async (req, res, next) => {
  const { userId, contestId } = req.body;
  let contest;
  try {
    contest = await contestModel.findById(contestId);
  } catch (err) {
    next(new AppError("Contest not found", StatusCodes.NOT_FOUND));
  }
  if (JSON.stringify(userId) == JSON.stringify(contest.createdBy))
    next(
      new AppError(
        "The onwer of the contest can  not be removed",
        StatusCodes.BAD_REQUEST
      )
    );
  let admins;
  try {
    admins = await contestModel.findByIdAndUpdate(
      contestId,
      {
        $pull: { admins: userId },
      },
      { new: true }
    );
  } catch (err) {
    next(
      new AppError(
        "SomeThing went wrong. try again latter..",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.json({ success: true, admins });
});

// apifeatures
export const showContestProblems = asyncHandler(async (req, res, next) => {
  const { contestId } = req.body;

  let contestproblems;
  try {
    contestproblems = await contestModel
      .findById(contestId, { problems: 1 })
      .populate("problems", {
        testCases: 0,
        ProblemDataId: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      });
  } catch (err) {
    console.error(err);
    next(new AppError(err.message, StatusCodes.BAD_REQUEST));
    return;
  }

  res.status(StatusCodes.OK).json(contestproblems);
});

// {{host}}/api/v1/judge/contest?contestId=65fac826bd7ff7f01908d554
// query = {} => all contests, query = id => single contest
export const showAllContests = asyncHandler(async (req, res, next) => {
  const searchObj = {};
  if (req.query.contestId) searchObj._id = req.query.contestId;

  const allcontests = await contestModel.find(searchObj);
  res.status(StatusCodes.OK).json(allcontests);
});

// {{host}}/api/v1/judge/contest/problem
export const showProblemDetails = asyncHandler(async (req, res, next) => {
  const problemId = req.params.problem

  if (!problemId)
    return next(
      new AppError("Problem Id not provided !!", StatusCodes.BAD_REQUEST)
    );

  let problem = undefined;

  try {
    problem = await problemModel
      .findById(problemId, { testCases: 0, existsIn: 0 })
      .populate("ProblemDataId", "-checker -_id -__v");
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
  if (!problem) next(new AppError("Problem not found", 404));
  res.status(StatusCodes.OK).json(problem);
});
