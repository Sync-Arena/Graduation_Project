import submissionModel from "../../../Database/Models/JudgeModels/submissionModel.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import getURL from "../../../util/apiPolygon.js";
import axios from "axios";
import { compile } from "./compilerController.js";
import getChecker from "../../../util/stdCheckers.js"
import AppError from "../../../util/appError.js"

const myCode = `
t = int(input())
while t:
	n = int(input())
	if n & 1:
		print("Bahy")
	else:
		print("Tesla")
	t -= 1
`

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


	const problemCheckerName = await axios.get(
		getURL("problem.checker", { problemId })
	)
	const checkerName = problemCheckerName.data.result
	let checkerContent = ""
	try {
		const getCheckerFile = await axios.get(
			getURL("problem.viewFile", {
				problemId,
				type: "source",
				name: checkerName,
			})
		)
		checkerContent = getCheckerFile.data
	} catch (err) {}

	if (!checkerContent) checkerContent = getChecker(checkerName)

	if (!checkerContent) next(new AppError("checker not found !!", 404))

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
		let response
		const sendData = {
			id: compiler,
			code,//: myCode, // change this
			input: input.data,
			answer: answer.data,
			time_limit: timeLimit,
			memory_limit: memoryLimit,
			checker: checkerContent,
		}
		try {
			response = await compile(sendData)
			return res.status(200).json(response)
		} catch (err) {
			console.log(err)
			return next(new AppError(err.message, 404))
		}
	}

	// const submission = await submissionModel.create(req.body)

	res.status(201).json({
		message: "Submission created successfully",
		// submission,
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
