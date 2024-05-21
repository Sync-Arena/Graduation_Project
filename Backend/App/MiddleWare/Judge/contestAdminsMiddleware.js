import asyncHandler from "express-async-handler"
import AppError from "../../../util/appError.js"
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js"
import StatusCodes from "http-status-codes"

export const isContestAdmin = asyncHandler(async (req, res, next) => {
	const { contestId } = req.body

	if (!contestId) next(new AppError("Contest Id must be provided", 404))

	let contest
	try {
		contest = await contestModel.findById(contestId)
	} catch (err) {
		next(new AppError("Wrong Id, Contest not found", 404))
	}
	if (!contest) next(new AppError("Contest does not exist", 404))
	const isadmin = contest.admins.some(
		(currentAdmin) =>
			JSON.stringify(currentAdmin) == JSON.stringify(req.user._id)
	)

	if (!isadmin)
		next(
			new AppError(
				"You are not allowed to edit this contest as you are not an admin",
				StatusCodes.BAD_REQUEST
			)
		)
	next()
})
