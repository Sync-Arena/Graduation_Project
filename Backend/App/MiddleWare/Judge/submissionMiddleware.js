import { cathcAsync } from "../../Controllers/errorControllers/errorContollers.js";

import getURL from "../../../util/apiPolygon.js";
import axios from "axios";
import { compile } from "../../../App/Controllers/JudgeControllers/compilerController.js";
import getChecker from "../../../util/stdCheckers.js";
import AppError from "../../../util/appError.js";

// {problemId: param, code, compilerCode, }
export const submit = cathcAsync(async (req, res, next) => {
  // Get IDs from request if exists
  const { compiler, code, problemId } = req.body;

  const problemInfo = await axios.get(getURL("problem.info", { problemId }));
  const { timeLimit, memoryLimit } = problemInfo.data.result;

  const problemTests = await axios.get(
    getURL("problem.tests", { problemId, testset: "tests" })
  );
  const testsIndexs = [];
  for (const obj of problemTests.data.result) {
    testsIndexs.push(obj.index);
  }

  const problemCheckerName = await axios.get(
    getURL("problem.checker", { problemId })
  );
  const checkerName = problemCheckerName.data.result;
  let checkerContent = "";
  try {
    const getCheckerFile = await axios.get(
      getURL("problem.viewFile", {
        problemId,
        type: "source",
        name: checkerName,
      })
    );
    checkerContent = getCheckerFile.data;
  } catch (err) {}

  if (!checkerContent) checkerContent = getChecker(checkerName);

  if (!checkerContent) next(new AppError("checker not found !!", 404));

  const status = [],
    answers = [],
    stdin = [],
    stdout = [];

  let languageName,
    memory = -1,
    time = -1,
    wholeStatus = "Accepted";

  for (let i = 0; i < testsIndexs.length; i++) {
    const input = await axios.get(
      getURL("problem.testInput", {
        problemId,
        testset: "tests",
        testIndex: testsIndexs[i],
      })
    );
    const answer = await axios.get(
      getURL("problem.testAnswer", {
        problemId,
        testset: "tests",
        testIndex: testsIndexs[i],
      })
    );

    let response;

    const sendData = {
      id: compiler,
      code: code, // change this
      input: input.data,
      answer: `${answer.data}`,
      time_limit: timeLimit,
      memory_limit: memoryLimit,
      checker: checkerContent,
    };
    try {
      response = await compile(sendData);

      stdin.push(response.stdin);
      stdout.push(response.stdout);
      answers.push(`${answer.data}`);
      status.push(response.status);

      languageName = response.language.name;
      memory = Math.max(memory, response.memory);
      time = Math.max(time, +response.time);
    } catch (err) {
      console.log(err);
      return next(new AppError(err.message, 404));
    }
    if (response.status_id != 3) {
      wholeStatus = "Not Accepted";
      break;
    }
  }

  req.submissionModel = {
    sourceCode: code,
    languageName,
    problemId,
    stdin,
    stdout,
    answers,
    status,
    memory,
    wholeStatus,
    time: `${time}`,
    user: req.user._id,
  };
  next();
});
