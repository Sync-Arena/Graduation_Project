import { cathcAsync } from "../../Controllers/errorControllers/errorContollers.js";

import getURL from "../../../util/apiPolygon.js";
import axios from "axios";
import { compile } from "../../../App/Controllers/JudgeControllers/compilerController.js";
import getChecker from "../../../util/stdCheckers.js";
import AppError from "../../../util/appError.js";
import problemModel, {
  problemTestCasesModel,
} from "../../../Database/Models/JudgeModels/ProblemModel.js";
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js";
import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";

// {problemId: param, code, compilerCode, }
const mycode = `
t = int(input())
while t:
  t-=1
  n = int(input())
  if n%2==1:
    print("Bahy")
  else:
    print("Tesla")
`;

export const inContest = cathcAsync(async (req, res, next) => {
  let reg = 1

  if (!reg) {
		next(new AppError("register to the contest before submiting", 401))
		return
	}
	const { contestId } = req.body
	let contest
	try {
		contest = await contestModel
			.findById(contestId)
			.select({ startTime: 1, durationInMinutes: 1, participatedUsers: 1 })
	} catch (err) {
		next(new AppError("Something went wrong, contest not found: ", 404))
		return
	}
	let { startTime, durationInMinutes, participatedUsers } = contest
	const gtime = startTime.getTime()
	let now = Date.now()

	// contest does not start yet ?
	if (now < gtime) return next(new AppError("Contest does not start yet", 400))

	// contest started
	if (gtime + durationInMinutes * 60 * 1000 >= now) {
		req.official = 1
	} else {
		req.official = 0
	}

	// ... if the submission is offical => should be resigstered first
	if (req.official) {
		const isRegistered =
			participatedUsers && participatedUsers.includes(req.user._id)
		if (!isRegistered)
			return next(
				new AppError("You should register first to submit a problem", 400)
			)
      // calcualte penalty after submitting
	}
  next();
});

export const submit = cathcAsync(async (req, res, next) => {
  let { compiler, code, problemId, contestId } = req.body;
  code = mycode
  // fetch the problem form database
  let problem;
  try {
    problem = await problemModel
      .findById(problemId)
      .populate({ path: "ProblemDataId", select: "checker" });
  } catch (err) {
    next(new AppError("Something went wrong, problem not found: ", 404));
    return;
  }

  // get timeLimit memoryLimit checker from the problem
  const { timeLimit, memoryLimit } = problem;
  const { checker } = problem.ProblemDataId;

  // initals
  const status = [],
    answers = [],
    stdin = [],
    stdout = [];

  let languageName,
    memory = -1,
    time = -1,
    wholeStatus = "Accepted";

  for (
    let testCase = 0;
    testCase < 1 /*problem.testCases.length*/;
    testCase++
  ) {
    let currentTestCase;
    try {
      currentTestCase = await problemTestCasesModel.findById(
        problem.testCases[testCase]
      );
    } catch (err) {
      next(
        new AppError("Something went wrong, problem testcase not found: ", 404)
      );
    }

    // the test case to be judged now
    const { input, answer } = currentTestCase;

    // time to judge
    const sendData = {
      id: compiler,
      code: code, // change this to code
      input: input,
      answer: answer,
      time_limit: timeLimit,
      memory_limit: memoryLimit,
      checker: checker,
    };

    // get response from the compiler
    let response;
    try {
      response = await compile(sendData);

      stdin.push(response.stdin);
      stdout.push(response.stdout);
      answers.push(answer);
      status.push(response.status);

      languageName = response.language.name;
      memory = Math.max(memory, response.memory);
      time = Math.max(time, +response.time);
    } catch (err) {
      console.log(err);
      return next(new AppError(err.message, 404));
    }
    if (response.status.id != 3) {
      wholeStatus = "Not Accepted";
      break;
    }
  }

  // add the submession to database
  req.submissionModel = {
    sourceCode: code,
    languageName,
    problemId,
    problemName : problem.name,
    stdin,
    stdout,
    answers,
    status,
    memory,
    wholeStatus,
    time: `${time}`,
    user: req.user._id,
    contest: contestId,
    isOfficial: req.official,
  };
  next();
});
