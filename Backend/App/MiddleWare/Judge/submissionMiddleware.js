import { cathcAsync } from "../../Controllers/errorControllers/errorContollers.js";
import getURL from "../../../util/apiPolygon.js";
import axios from "axios";
import { compile } from "../../../App/Controllers/JudgeControllers/compilerController.js";
import { stdWcmpCpp } from "../../../util/stdCheckers.js";

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

  const status = [],
    answers = [],
    stdin = [],
    stdout = [];

  let languageName,
    memory = -1,
    time = -1,
    wholeStatus = "Accepted";

  for (let i = 0; i < 1 /*testsIndexs.length*/; i++) {
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
    const response = await compile({
      id: compiler,
      code,
      input: input.data,
      answer: `${answer.data}`,
      time_limit: timeLimit,
      memory_limit: memoryLimit,
      checker: stdWcmpCpp, // need to specify right one
    });

    const st = {
      description: response.status.description,
      pr: response.status.pr,
    };

    stdin.push(response.stdin);
    stdout.push(response.stdout);
    answers.push(`${answer.data}`);
    status.push(st);

    languageName = response.language.name;
    memory = Math.max(memory, response.memory);
    time = Math.max(time, +response.time);

    if (response.status.description !== "Accepted") {
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
