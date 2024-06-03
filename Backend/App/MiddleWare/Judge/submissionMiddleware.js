import { cathcAsync } from '../../Controllers/errorControllers/errorContollers.js'
import asyncHandler from 'express-async-handler'
import { compile } from '../../../App/Controllers/JudgeControllers/compilerController.js'
import AppError from '../../../util/appError.js'
import problemModel, { problemTestCasesModel } from '../../../Database/Models/JudgeModels/ProblemModel.js'
import contestModel from '../../../Database/Models/JudgeModels/contestModel.js'
import submissionModel from '../../../Database/Models/JudgeModels/submissionModel.js'
import userContestModel from '../../../Database/Models/JudgeModels/user-contestModel.js'
import RunningContest from '../../../Database/Models/JudgeModels/runningContestModel.js'
import userModel from '../../../Database/Models/UserModels/userModels.js'

// {problemId: param, code, compilerCode, }
const mycode = `
t = int(input())
while t:
  t-=1
  n = int(input())
  if n%2==1:
    print("Bahy")
  else:
    print("Tesla")
`

export const inContest = cathcAsync(async (req, res, next) => {
    const { contestId } = req.body
    let contest
    try {
        contest = await contestModel.findById(contestId).select({
            startTime: 1,
            durationInMinutes: 1,
            participatedUsers: 1,
        })
    } catch (err) {
        next(new AppError('Something went wrong, contest not found: ', 404))
        return
    }
    let { startTime, durationInMinutes, participatedUsers } = contest
    const gtime = startTime.getTime()
    req.startTime = startTime
    let now = Date.now()
    req.endTime = new Date(gtime + durationInMinutes * 60 * 1000)

    // contest does not start yet ?
    if (now < gtime) return next(new AppError('Contest does not start yet', 400))

    // contest started
    if (gtime + durationInMinutes * 60 * 1000 >= now) {
        req.official = 1
        req.minsfromstart = (gtime + durationInMinutes * 60 * 1000 - now) / (60 * 1000)
    } else {
        req.official = 0
    }

    // ... if the submission is offical => should be resigstered first
    if (req.official) {
        const isRegistered = participatedUsers && participatedUsers.includes(req.user._id)
        if (!isRegistered) return next(new AppError('You should register first to submit a problem', 400))
        // calcualte penalty after submitting
    } else {
        const vir = await RunningContest.find({
            contestId: contestId,
            userId: req.user._id,
        })
        if (vir.length) {
            req.offical = 2
            req.virtualId = vir[0]._id
            let vtime = vir[0].createdAt.getTime()
            let t = vtime + durationInMinutes * 60 * 1000 - now
            req.createdAt = new Date(t + gtime)
            req.minsfromstart = t / (60 * 1000)
        }
    }
    next()
})

export const submit = cathcAsync(async (req, res, next) => {
    let { compiler, code, problemId, contestId } = req.body
    //code = mycode
    // fetch the problem form database
    let problem
    try {
        problem = await problemModel.findById(problemId).populate({ path: 'ProblemDataId', select: 'checker' })
    } catch (err) {
        next(new AppError('Something went wrong, problem not found: ', 404))
        return
    }

    // get timeLimit memoryLimit checker from the problem
    const { timeLimit, memoryLimit } = problem
    const { checker } = problem.ProblemDataId

    // initals
    const status = [],
        answers = [],
        stdin = [],
        stdout = []

    let languageName,
        memory = -1,
        time = -1,
        wholeStatus = 'Accepted'

    for (let testCase = 0; testCase < 1 /*problem.testCases.length*/; testCase++) {
        let currentTestCase
        try {
            currentTestCase = await problemTestCasesModel.findById(problem.testCases[testCase])
        } catch (err) {
            next(new AppError('Something went wrong, problem testcase not found: ', 404))
        }

        // the test case to be judged now
        const { input, answer } = currentTestCase

        // time to judge
        const sendData = {
            id: compiler,
            code: code, // change this to code
            input: input,
            answer: answer,
            time_limit: timeLimit,
            memory_limit: memoryLimit,
            checker: checker,
        }

        // get response from the compiler
        let response
        try {
            response = await compile(sendData)

            stdin.push(response.stdin)
            stdout.push(response.stdout)
            answers.push(answer)
            status.push(response.status)

            languageName = response.language.name
            memory = Math.max(memory, response.memory)
            time = Math.max(time, +response.time)
        } catch (err) {
            console.log(err)
            return next(new AppError(err.message, 404))
        }
        if (response.status.id != 3) {
            wholeStatus = 'Not Accepted'
            break
        }
    }

    // add the submession to database
    req.submissionModel = {
        sourceCode: code,
        languageName,
        problemId,
        problemName: problem.name,
        stdin,
        stdout,
        answers,
        status,
        memory,
        wholeStatus,
        time: `${time}`,
        user: req.user._id,
        contest: contestId,
        isOfficial: req.official,
        virtualId: null,
    }
    if (req.virtualId) {
        req.submissionModel.virtualId = req.virtualId
        req.submissionModel.createdAt = req.createdAt
    }
    next()
})

export const preSubmiting = asyncHandler(async (req, res, next) => {
    const allRecords = await submissionModel.find({
        problemId: req.submissionModel.problemId,
        contest: req.body.contestId,
        user: req.user._id,
    })
    const { contestId } = req.body
    const userId = req.user._id
    const accBefore = allRecords.filter((record) => record.wholeStatus === 'Accepted')
    // console.log(allRecords)
    // console.log(req.submissionModel.isOfficial, allRecords.length)
    req.members = []
    if (req.submissionModel.isOfficial != 0) {
        let getc = await userContestModel.findOne({ contestId, userId: req.user._id })
        req.members = getc.members
        req.teamId = getc.teamId
    } else req.members.push(req.user._id)
    if (req.submissionModel.isOfficial == 1 && allRecords.length == 0) {
        req.members.forEach(async (element) => {
            const newVirtual = await RunningContest.create({
                contestId,
                userId: element,
                expireAt: req.endTime,
                createdAt: req.startTime,
            })
        })
    }
    // Add the solved problem to the user's solvedProblems array if not already added
    if (req.submissionModel.wholeStatus === 'Accepted') {
        req.members.forEach(async (element) => {
            await userModel.updateOne(
                {
                    _id: element,
                    'solvedProblems.problemId': {
                        $ne: req.submissionModel.problemId,
                    },
                },
                {
                    $addToSet: {
                        solvedProblems: {
                            problemId: req.submissionModel.problemId,
                            solvedAt: new Date(),
                        },
                    },
                }
            )
        })
    }
    // console.log(accBefore.length, req.user)
    if (!accBefore.length) {
        //increase the number of solvers for the problem
        const res = await problemModel.findByIdAndUpdate(
            req.submissionModel.problemId,
            {
                $inc: { numberOfSolvers: 1 },
            },
            { new: true }
        )
        // console.log(res);
        //calculate penality and rank if it is official or virtual

        if (req.submissionModel.isOfficial != 0) {
            const wrongs = await submissionModel.find({
                problemId: req.submissionModel.problemId,
                user: req.user._id,
            })

            let pen = req.minsfromstart + wrongs.length * 20
            //check if there is a record or not
            // let isexist = await userContestModel.countDocuments({
            //     contestId,
            //     userId,
            // })
            // if (!isexist) {
            //     let all = await userContestModel.countDocuments({ contestId })
            //     let ob = {}
            //     ob.contestId = contestId
            //     ob.userId = userId
            //     ob.Rank = all + 1
            //     let create = await userContestModel.create(ob)
            // }
            //update my penalty and get my new penalty and problems solved
            const updated = await userContestModel.findOneAndUpdate(
                { contestId, userId },
                {
                    $addToSet: {
                        solvedProblemsIds: req.submissionModel.problemId,
                    },
                    $inc: { Penality: pen },
                },
                { new: true }
            )
            // console.log(updated)
            if (req.members.length < 2) {
                pen = updated.Penality
                let rank = updated.Rank
                let num = updated.solvedProblemsIds.length
                if (num == 1 && req.submissionModel.isOfficial === 1) {
                    // Update the user's officailContests array with the new UserContestRelation ID
                    await userModel.findOneAndUpdate(
                        { _id: userId },
                        {
                            $addToSet: { officialContests: create._id },
                        },
                        { new: true }
                    )
                }
                const high_rank = await userContestModel.countDocuments({
                    userId,
                    contestId,
                    $or: [
                        { $expr: { $gt: [{ $size: '$solvedProblemsIds' }, num] } },
                        {
                            $and: [
                                {
                                    $expr: {
                                        $eq: [{ $size: '$solvedProblemsIds' }, num],
                                    },
                                },
                                { Penalty: { $lt: pen } },
                            ],
                        },
                    ],
                    teamId: { $exists: false },
                })
                let newrank = high_rank + 1
                const up2 = await userContestModel.updateMany(
                    { contestId, userId, rank: { $gte: rank, $lt: newrank }, teamId: { $exists: false } },
                    { $inc: { rank: -1 } }
                )
                const updated2 = await userContestModel.findOneAndUpdate(
                    { contestId, userId },
                    {
                        $set: { Rank: newrank },
                    },
                    { new: true }
                )
            }
        }
        // calcualte penality and new rank if req.submissionModel.isOfficial = 1
    }
    next()
})
