import asyncHandler from 'express-async-handler'
import RunningContest from '../../../Database/Models/JudgeModels/runningContestModel.js'
import { StatusCodes } from 'http-status-codes'
import contestModel from '../../../Database/Models/JudgeModels/contestModel.js'
import AppError from '../../../util/appError.js'
import UserContest from '../../../Database/Models/JudgeModels/user-contestModel.js'

export const startVitualContest = asyncHandler(async (req, res, next) => {
    // if (req.inRunningContest) {
    //     // running contest middleware
    //     return next(new AppError("Can't be in more than one running contest !!", 400))
    // }

    const contestId = req.params.contest
    let contest
    try {
        contest = await contestModel.findById(contestId)
    } catch (err) {
        return next(new AppError(err.message, 400))
    }
    if (!contest) return next(new AppError('Contest Not found', 404))

    const timeForContestToFinsh = new Date(contest.startTime.getTime() + contest.durationInMinutes[0] * 60000) // (time minutes + one hour) * 60000 milliseconds
    const contestexipreAt = new Date(Date.now() + contest.durationInMinutes[0] * 60000)

    if (Date.now() <= timeForContestToFinsh) {
        return next(new AppError("You can't start virtual after the contest ends "))
    }

    const newVirtual = await RunningContest.create({
        contestId,
        userId: req.user._id,
        expireAt: contestexipreAt,
        createdAt: Date.now(),
    })
    let ob = {}
    ob.contestId = contestId
    ob.userId = req.user._id
    ob.members = []
    ob.members.push(req.user._id)
    let create = await UserContest.create(ob)

    res.status(StatusCodes.CREATED).json(newVirtual)
})
