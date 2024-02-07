import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import getURL from "../../../util/apiPolygon.js"
import axios from "axios"
import { compile } from "./compilerController.js"
import { stdWcmpCpp } from "../../../util/stdCheckers.js"

// {problemId: param, code, compilerCode, }
export const submit = cathcAsync(async (req, res, next) => {
	// Get IDs from request if exists
	const { compiler, code, problemId } = req.body

	const problemInfo = await axios.get(getURL("problem.info", { problemId }))
	const { timeLimit, memoryLimit } = problemInfo.data.result

	const problemTests = await axios.get(
		getURL("problem.tests", { problemId, testset: "tests" })
	)
	const testsIndexs = []
	for (const obj of problemTests.data.result) {
		testsIndexs.push(obj.index)
	}

	for (let i = 0; i < 1 /*testsIndexs.length*/; i++) {
		const input = await axios.get(
			getURL("problem.testInput", {
				problemId,
				testset: "tests",
				testIndex: testsIndexs[i],
			})
		)
		const answer = await axios.get(
			getURL("problem.testAnswer", {
				problemId,
				testset: "tests",
				testIndex: testsIndexs[i],
			})
		)
		try {
			const response = await compile({
				id: compiler,
				code,
				input: input.data,
				answer: answer.data,
				time_limit: timeLimit,
				memory_limit: memoryLimit,
				checker: stdWcmpCpp, // need to specify right one
			})
			return res.status(200).json(response)
		} catch (err) {
			console.log(err)
		}
	}

	// const submission = await submissionModel.create(req.body)

	res.status(201).json({
		message: "Submission created successfully",
		submission,
	})
})

export const mySubmissions = cathcAsync(async function (req, res, next) {
  // Note: populate is called in query Middleware
  const user = await submissionModel.findOne({ user: req.user.id });

  res.status(200).json({
    meassage: "submissions Showed Successfully",
    user,
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
