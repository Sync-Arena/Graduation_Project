import asyncHandler from "express-async-handler";
import Contest from "../../../Database/Models/JudgeModels/contestModel.js";
import AppError from "../../../util/appError.js";
import { resGen } from "../../MiddleWare/helpers/helper.js";
import { cathcAsync } from "../errorControllers/errorContollers.js";
import userModel from "../../../Database/Models/UserModels/userModels.js"
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js"
import { StatusCodes } from "http-status-codes"

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
		paticipatedUsers,
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

/*

1- add problem
2- delete problem
3- 


*/
