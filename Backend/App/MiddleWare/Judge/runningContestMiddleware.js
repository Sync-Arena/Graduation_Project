import asyncHandler from "express-async-handler"
import RunningContest from "../../../Database/Models/JudgeModels/runningContestModel.js"
import contestModel from "../../../Database/Models/JudgeModels/contestModel.js"

export const isInRunningContest = asyncHandler(async (req, res, next) => {
	const runningcontest = await RunningContest.findOne({ userId: req.user._id })


    req.inRunningContest = runningcontest ? true : false

    next()
})


export const virualTimeForContest = asyncHandler(async (req, res, next) => {
	const runningcontest = await RunningContest.findOne({
		userId: req.user._id,
		contestId: req.params.contest,
	})
    const contest = await contestModel.findById(req.params.contest)
    req.contest = contest

	if (!runningcontest) { // pratice OR don't sumbit anything yet => realTime
        req.virutalTime = new Date(Date.now())
    }
    else { // offical or virtual
        let currentVirtualMoment = Date.now() - runningcontest.createdAt.getTime() 
        let realPastTime = new Date(contest.startTime.getTime() + currentVirtualMoment)

        req.virutalTime = realPastTime
    }
    console.log(req.virutalTime)
    next()
})