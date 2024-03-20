import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import userModel from "../../../Database/Models/UserModels/userModels.js"
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js"
import { StatusCodes } from "http-status-codes"

const createUsersObjects = function (startTime, submissions) {
	const usersSubmissions = {}

	submissions.forEach(async (submission) => {
		const user = await userModel.findById(submission.user.id)
		const name = user.userName

		const problem = await userModel.findById(submission.problemId)
		const problemName = problem.name

		let submitObject = {
			time: Math.floor((submission.createdAt - startTime) / (1000 * 60)),
			problemName,
			status: submission.status,
			wholeStatus: submission.wholeStatus,
		}

		if (!usersSubmissions[name]) {
			usersSubmissions[name].penalty = 0
			usersSubmissions[name].solvedProblems = 0
			usersSubmissions[name].submissions = [submitObject]

			if (submission.wholeStatus === "Accepted") {
				usersSubmissions[name].penalty += time
				usersSubmissions[name].solvedProblems++
			} else usersSubmissions[name].penalty += 10
		} else {
			if (submission.wholeStatus === "Accepted") {
				usersSubmissions[name].penalty += time
				usersSubmissions[name].submissions.push(submitObject)
				usersSubmissions[name].solvedProblems++
			} else usersSubmissions[name].penalty += 10
		}
	})

	return usersSubmissions
}

const sortUsers = function (usersObjects) {
	const rows = []

	for (const [key, value] of Object.entries(usersObjects)) {
		rows.push({ userName: key, submissionObject: value })
	}

	rows.sort((obj1, obj2) => {
		const user1 = obj1.submissionObject
		const user2 = obj2.submissionObject

		if (user1.solvedProblems < user2.solvedProblems) return 1
		if (user1.solvedProblems > user2.solvedProblems) return -1
		if (user1.solvedProblems === user2.solvedProblems) {
			if (user1.penalty > user2.penalty) return 1
			else return -1
		}
	})

	return rows
}

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
	} = req.body

	if (!contestName) next(new AppError("Please add name for the contest", 400))

	if (!startTime)
		next(new AppError("Please add start time for the contest", 400))

	if (isNaN(durationInMinutes))
		next(new AppError("The duration must be a positive number", 400))

	durationInMinutes = Number(durationInMinutes)

	const newContest = await Contest.create({
		contestName,
		description,
		startTime,
		durationInMinutes,
		participatedUsers,
		problems,
		createdBy: req.user._id,
		admins: [req.user._id],
	})
	resGen(res, 201, "success", "The contest has been created", newContest)
})

export const addProblem = cathcAsync(async (req, res, next) => {
	const { contestId, problemId } = req.body

	const contest = await Contest.findByIdAndUpdate(
		contestId,
		{ $push: { problems: problemId } },
		{ new: true }
	)
	resGen(res, 200, "success", "The problem has been added to contest", contest)
})

export const deleteProblem = cathcAsync(async (req, res, next) => {
	const { contestId, problemId } = req.body
	const contest = await Contest.findByIdAndUpdate(
		contestId,
		{ $pull: { problems: problemId } },
		{ new: true }
	)
	resGen(
		res,
		200,
		"success",
		"The problem has been deleted from the contest",
		contest
	)
})

export const AllSubmissionsOfContest = cathcAsync(async (req, res, next) => {
	const { contestId } = req.body

	if (!contestId) next(new AppError("Contest Id missing", 400))

	const submissions = await submissionModel.find({ contest: contestId })
	resGen(res, 200, "success", "All submissions of the contest", submissions)
})

export const UserSubmissionsInContest = cathcAsync(async (req, res, next) => {
	const userId = req.user._id
	const { contestId } = req.body

	if (!contestId) next(new AppError("Contest Id missing", 400))

	const submissions = await submissionModel.find({
		user: userId,
		contest: contestId,
	})
	resGen(res, 200, "success", "Your submissions in the contest", submissions)
})

// Controller function to register user for a contest
export const registerForContest = cathcAsync(async (req, res, next) => {
	try {
		const userId = req.user._id
		const { contestId } = req.body

		const contest = await Contest.findById(contestId)

		if (!contest) next(new AppError("Contest not found", 400))

		const updated = await Contest.findByIdAndUpdate(
			contestId,
			{ $push: { paticipatedUsers: userId } },
			{ new: true }
		)

		resGen(res, 200, "success", "User registered for the contest")
	} catch (error) {
		throw new AppError(`Error registering user for contest:${error}`)
	}
})

// Controller function to cancel user registration for a contest
export const cancelContestRegistration = cathcAsync(async (req, res, next) => {
	try {
		const userId = req.user._id
		const { contestId } = req.body

		const contest = await Contest.findById(contestId)

		if (!contest) next(new AppError("Contest not found", 400))

		const updated = await Contest.findByIdAndUpdate(
			contestId,
			{ $pull: { paticipatedUsers: userId } },
			{ new: true }
		)

		resGen(res, 200, "success", "User registration canceled for the contest")
	} catch (error) {
		throw new AppError(`Error canceling user registration for contest:${error}`)
	}
})

export const addAdminToContest = asyncHandler(async (req, res, next) => {
	const { userId, contestId } = req.body
	if (!userId) next(new AppError("Please provide a user ID", 404))

	let isUserExist
	try {
		isUserExist = await userModel.findById(userId)
	} catch (err) {
		next(new AppError("User not found", 404))
	}
	if (!isUserExist) next(new AppError("User not found", 404))

	let admins
	try {
		admins = await contestModel.findByIdAndUpdate(
			contestId,
			{
				$addToSet: { admins: userId },
			},
			{ new: true }
		)
	} catch (err) {
		next(
			new AppError(
				"SomeThing went wrong. try again latter..",
				StatusCodes.BAD_REQUEST
			)
		)
	}
	return res.json({ success: true, admins })
})

export const removeAdminFromContest = asyncHandler(async (req, res, next) => {
	const { userId, contestId } = req.body
	let contest
	try {
		contest = await contestModel.findById(contestId)
	} catch (err) {
		next(new AppError("Contest not found", StatusCodes.NOT_FOUND))
	}
	if (JSON.stringify(userId) == JSON.stringify(contest.createdBy))
		next(
			new AppError(
				"The onwer of the contest can  not be removed",
				StatusCodes.BAD_REQUEST
			)
		)
	let admins
	try {
		admins = await contestModel.findByIdAndUpdate(
			contestId,
			{
				$pull: { admins: userId },
			},
			{ new: true }
		)
	} catch (err) {
		next(
			new AppError(
				"SomeThing went wrong. try again latter..",
				StatusCodes.BAD_REQUEST
			)
		)
	}
	return res.json({ success: true, admins })
})

// apifeatures
export const showContestProblems = asyncHandler(async (req, res, next) => {
	const { contestId } = req.body

	let contestproblems
	try {
		contestproblems = await contestModel
			.findById(contestId, { problems: 1 })
			.populate("problems", {
				testCases: 0,
				ProblemDataId: 0,
				createdAt: 0,
				updatedAt: 0,
				__v: 0,
			})
	} catch (err) {
		console.error(err)
		next(new AppError(err.message, StatusCodes.BAD_REQUEST))
		return
	}

	res.status(StatusCodes.OK).json(contestproblems)
})

// apifeatures
export const showAllContests = asyncHandler(async (req, res, next) => {
	const allcontests = await contestModel.find({})
	res.status(StatusCodes.OK).json(allcontests)
})