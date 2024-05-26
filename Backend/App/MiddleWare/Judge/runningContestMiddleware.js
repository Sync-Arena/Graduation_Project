import asyncHandler from "express-async-handler"
import RunningContest from "../../../Database/Models/JudgeModels/runningContestModel.js"

export const isInRunningContest = asyncHandler(async (req, res, next) => {
	const runningcontest = await RunningContest.findOne({ userId: req.user._id })


    req.inRunningContest = runningcontest ? true : false

    next()
})
