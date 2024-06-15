import asyncHandler from 'express-async-handler'
import Contest from '../../../Database/Models/JudgeModels/contestModel.js'
import AppError from '../../../util/appError.js'
import { resGen } from '../../MiddleWare/helpers/helper.js'
import { cathcAsync } from '../errorControllers/errorContollers.js'
import userModel from '../../../Database/Models/UserModels/userModels.js'
import AdditionalData from '../../../Database/Models/UserModels/additionalDataModel.js'
import contestModel from '../../../Database/Models/JudgeModels/contestModel.js'
import { StatusCodes } from 'http-status-codes'
import submissionModel from '../../../Database/Models/JudgeModels/submissionModel.js'
import problemModel from '../../../Database/Models/JudgeModels/ProblemModel.js'
import UserContest from '../../../Database/Models/JudgeModels/user-contestModel.js'
import TeamModel from '../../../Database/Models/JudgeModels/teamModel.js'
import RunningContestModel from '../../../Database/Models/JudgeModels/runningContestModel.js'
import userContestModel from '../../../Database/Models/JudgeModels/user-contestModel.js'
import { calculateRatingChanges } from '../../../App/Controllers/JudgeControllers/RatingCalculator.js'

export const createUsersObjects = cathcAsync(async function (req, res, next) {
    const contest = await contestModel.findById(req.params.contestId).populate('submissions')

    const submissions = contest.submissions
    const startTime = contest.startTime
    let contestproblems = await contestModel.findById(req.params.contestId, { problems: 1 }).populate('problems', {
        testCases: 0,
        ProblemDataId: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
    })
    let users = await userModel.find({})
    let usersMap = {}
    for (let user of users) {
        usersMap[user._id] = user
    }
    let teams = await TeamModel.find({})
    let teamsMap = {}
    for (let team of teams) {
        teamsMap[team._id] = team
    }
    // console.log(usersMap)

    // console.log(contestproblems)
    let prob_id_to_number = {},
        i = 0,
        problemsMap = {}
    contestproblems.problems.forEach((element) => {
        prob_id_to_number[element._id] = i++
        problemsMap[element._id] = element
    })
    req.noproblems = i
    // console.log(prob_id_to_number)
    const l = submissions.length
    const usersSubmissions = {}
    submissions.sort((a, b) => a.createdAt - b.createdAt)
    // console.log(submissions)
    // submissions.forEach((submission, idx) => {
    for (let submission of submissions) {
        if (submission.user) {
            let name = ''
            let usid
            let user
            let x = submission.members.map(async (member) => {
                // user = await userModel.findById(member)
                user = usersMap[member]
                if (name != '') name += ', '
                name += user.userName
            })
            await Promise.all(x)
            if (submission.teamId) {
                // const team = await TeamModel.findById(submission.teamId)
                const team = teamsMap[submission.teamId]
                name = team.teamName + ' ' + name
            } else {
                // const user = await userModel.findById(submission.user)
                const user = usersMap[submission.user.id]
                // console.log(user, submission.user)
                name = user.userName
                usid = user._id
            }
            if (submission.isOfficial == 2) name += '#'
            if (submission.isOfficial == 0) name = '*' + name
            const problem = problemsMap[submission.problemId]
            const problemName = prob_id_to_number[problem._id]
            // console.log(name, submission.wholeStatus, problemName)

            let submitObject = {
                time: submission.isOfficial ? Math.floor((submission.createdAt - startTime) / (1000 * 60)) : submission.createdAt,
                problemName,
                status: submission.status,
                wholeStatus: submission.wholeStatus,
            }

            // console.log(name, problemName, problem._id)
            // console.log(prob_id_to_number)
            if (!usersSubmissions[name]) {
                usersSubmissions[name] = {}
                usersSubmissions[name].problems = []
                usersSubmissions[name].userId = usid
                contestproblems.problems.forEach((element) => {
                    let obj = {}
                    obj.penalty = 0
                    obj.solved = 0
                    obj.wronges = 0
                    usersSubmissions[name].problems.push(obj)
                })
                usersSubmissions[name].solvedProblems = 0
                usersSubmissions[name].isOfficial = submission.isOfficial
                // usersSubmissions[name].submissions = [submitObject]
                usersSubmissions[name].penalty = submission.isOfficial ? 0 : undefined
            }
            if (submission.wholeStatus === 'Accepted') {
                if (submission.isOfficial) {
                    if (usersSubmissions[name].problems[problemName].solved == 0)
                        usersSubmissions[name].penalty += submitObject.time + usersSubmissions[name].problems[problemName].penalty
                }
                // usersSubmissions[name].submissions.push(submitObject)
                if (usersSubmissions[name].problems[problemName].solved == 0) usersSubmissions[name].solvedProblems++
                usersSubmissions[name].problems[problemName].solved = 1
            } else {
                if (usersSubmissions[name].problems[problemName].solved == 0) {
                    usersSubmissions[name].problems[problemName].wronges += 1
                    if (submission.isOfficial) {
                        usersSubmissions[name].problems[problemName].penalty += 10
                    }
                }
            }
            // console.log(JSON.stringify(usersSubmissions, null, 2))

            // }
            // if (idx === l - 1) {
            // }
        }
    }
    req.usersSubmissions = usersSubmissions
    next()
    // if (submissions.length == 0) next()
})

export const sortUsers = cathcAsync(async function (req, res, next) {
    const rowsOfficial = []
    const rowsUnOfficial = []
    // console.log(JSON.stringify(req.usersSubmissions, null, 2))
    if (req.usersSubmissions) {
        for (const [key, value] of Object.entries(req.usersSubmissions)) {
            value.isOfficial
                ? rowsOfficial.push({ userName: key, submissionObject: value })
                : rowsUnOfficial.push({ userName: key, submissionObject: value })
        }
    }

    rowsOfficial.sort((obj1, obj2) => {
        const user1 = obj1.submissionObject
        const user2 = obj2.submissionObject

        if (user1.solvedProblems < user2.solvedProblems) return 1
        if (user1.solvedProblems > user2.solvedProblems) return -1
        if (user1.solvedProblems === user2.solvedProblems) {
            if (user1.penalty >= user2.penalty) return 1
            else return -1
        }
    })

    rowsUnOfficial.sort((obj1, obj2) => {
        const user1 = obj1.submissionObject
        const user2 = obj2.submissionObject
        return user1.solvedProblems < user2.solvedProblems ? 1 : -1
    })
    let i = 0
    for (; i < rowsOfficial.length; i++) {
        let j = i
        while (
            j < rowsOfficial.length &&
            rowsOfficial[i].submissionObject.solvedProblems == rowsOfficial[j].submissionObject.solvedProblems &&
            rowsOfficial[i].submissionObject.penalty == rowsOfficial[j].submissionObject.penalty
        ) {
            rowsOfficial[j].rank = i + 1
            // let temp = await UserContest.updateOne(
            //     { contestId: req.params.contestId, userId: rowsOfficial[j].submissionObject.userId },
            //     { Penality: rowsOfficial[j].submissionObject.penalty, Rank: i + 1, entered: 1 }
            // )
            j++
        }
        i = j - 1
    }
    // console.log(rowsOfficial)
    req.users = [...rowsOfficial, ...rowsUnOfficial]
    next()
})

export const showStanding = cathcAsync(async function (req, res, next) {
    res.status(200).json({
        status: 'Success',
        message: 'Standing showed successfully',
        standing: req.users,
        noOfProblmes: req.noproblems,
    })
})

// api => api/v1/Judge/contest
// method : POST
// payload : contestName: String , description: String , problems:Object[problem]

export const createContest = asyncHandler(async (req, res, next) => {
    let { contestName, description, startTime, durationInMinutes, participatedUsers, problems } = req.body

    if (!contestName) next(new AppError('Please add name for the contest', 400))

    if (!startTime) startTime = Date.now()

    if (isNaN(durationInMinutes)) next(new AppError('The duration must be a positive number', 400))

    durationInMinutes = Number(durationInMinutes)
    const newContest = await Contest.create({
        contestName,
        description,
        startTime,
        durationInMinutes,
        participatedUsers,
        // problems,
        createdBy: req.user._id,
        admins: [req.user._id],
    })
    for (let problem of problems) {
        pushContestToExitsIn(newContest._id, problem, newContest)
    }
    resGen(res, 201, 'success', 'The contest has been created', newContest)
})

// Function to generate indices up to a specified count
function generateIndices(count) {
    const indices = []
    const base = 26

    for (let i = 0; i < count; i++) {
        let index = ''
        let number = i

        while (number >= 0) {
            index = String.fromCharCode((number % base) + 65) + index
            number = Math.floor(number / base) - 1
        }

        indices.push(index)
    }

    return indices
}

// Pre-generate a list of indices
const maxIndices = 1000
const preGeneratedIndices = generateIndices(maxIndices)

// function to push contest Id into exitsIn array inside problem document
const pushContestToExitsIn = async (contestId, problemId, contest) => {
    const arrSize = contest.problems.length

    await problemModel
        .findByIdAndUpdate(
            problemId,
            {
                $push: {
                    existsIn: {
                        contestId: contestId,
                        IndexInContest: preGeneratedIndices[arrSize - 1],
                    },
                },
            },
            { new: true }
        )
        .catch((error) => {
            next(AppError(`Error while pushing contest ID into the exitsIn array: ${error}`, 400))
        })
}

// function to delte contest Id from exitsIn array inside problem document
const deleteContestFromExitsIn = async (problemId, contestId) => {
    await problemModel
        .findByIdAndUpdate(
            problemId,
            {
                $pull: {
                    existsIn: {
                        contestId: contestId,
                    },
                },
            },
            { new: true }
        )
        .catch((error) => {
            next(AppError(`Error while deleting contest ID from the exitsIn array: ${error}`, 400))
        })
}

// function to add problem to contest
export const addProblem = cathcAsync(async (req, res, next) => {
    let problemId = req.params.problem
    const { contestId } = req.body

    if (!problemId) return next(new AppError('Problem Id missing', 400))

    const problem = await problemModel.findById(problemId)
    if (!problem) return next(new AppError('The problem with current ID does not exist', 400))

    const contest = await Contest.findByIdAndUpdate(contestId, { $push: { problems: problemId } }, { new: true })

    await pushContestToExitsIn(contestId, problemId, contest)

    resGen(res, 200, 'success', 'The problem has been added to contest', contest)
})

// function to delte problem from contest
export const deleteProblem = cathcAsync(async (req, res, next) => {
    let problemId = req.params.problem
    const { contestId } = req.body

    if (!problemId) return next(new AppError('Problem Id missing', 400))

    const problem = await problemModel.findById(problemId)

    if (!problem) return next(new AppError('The problem with current ID does not exist', 400))

    const contest = await Contest.findByIdAndUpdate(contestId, { $pull: { problems: problemId } }, { new: true })

    await deleteContestFromExitsIn(problemId, contestId)

    resGen(res, 200, 'success', 'The problem has been deleted from the contest', contest)
})

// {{host}}/api/v1/judge/contest/all-submissions
export const AllSubmissionsOfContest = cathcAsync(async (req, res, next) => {
    let contestId = req.params.contest
    let { problemId, status, language, userName } = req.body
    userName = userName ? userName.trim() : userName
    const filter = {}
    const { skip, limit } = req.pagination
    if (!contestId) next(new AppError('Contest Id missing', 400))

    if (problemId) filter.problemId = problemId
    if (status) filter['status.description'] = status
    if (language) filter.languageName = language
    if (userName) {
        const user = await userModel.findOne({ userName: userName })
        if (user) filter.user = user._id
        else next(new AppError('User does not exit', 400))
    }

    const submissions = await submissionModel
        .find({
            contest: contestId,
            ...filter,
            createdAt: { $lt: req.virutalTime },
        })
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)
    resGen(
        res,
        200,
        'success',
        'All submissions of the contest',
        submissions
        // contestName: req.contest.contestName,
    )
})

// {{host}}/api/v1/judge/contest/my-submissions
export const UserSubmissionsInContest = cathcAsync(async (req, res, next) => {
    let contestId = req.params.contest
    const userId = req.user._id
    const { problemId, status, language } = req.body
    const filter = { user: userId }
    const { skip, limit } = req.pagination

    if (!contestId) next(new AppError('Contest Id missing', 400))

    if (problemId) filter.problemId = problemId
    if (status) filter['status.description'] = status
    if (language) filter.languageName = language

    const submissions = await submissionModel
        .find({
            contest: contestId,
            ...filter,
            createdAt: { $lt: req.virutalTime },
        })
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)

    resGen(
        res,
        200,
        'success',
        'Your submissions in the contest',
        submissions
        // contestName: req.contest.contestName,
    )
})

// Controller function to register user for a contest
export const registerForContest = cathcAsync(async (req, res, next) => {
    try {
        let teamId = null
        const contestId = req.params.contest
        const contest = await Contest.findById(contestId)
        if (!contest) return next(new AppError('Contest not found', 400))
        if (req.body.teamId) {
            teamId = req.body.teamId
            const commonElements = req.body.members.filter((element) => contest.participatedUsers.includes(element))
            if (commonElements && commonElements.length) {
                //how to return them ???
                return next(new AppError('their are members in the team that already registered', 400))
            }
            req.body.members.forEach(async (member) => {
                const updated = await Contest.findByIdAndUpdate(contestId, { $addToSet: { participatedUsers: member } }, { new: true })
                let ob = {}
                ob.contestId = contestId
                ob.userId = member
                ob.teamId = teamId
                ob.members = req.body.members
                // ob.Rank = all + 1
                let create = await UserContest.create(ob)
            })
        } else {
            const userId = req.user._id
            const updated = await Contest.findByIdAndUpdate(contestId, { $addToSet: { participatedUsers: userId } }, { new: true })
            let ob = {}
            ob.contestId = contestId
            ob.userId = userId
            ob.members = []
            ob.members.push(userId)
            let create = await UserContest.create(ob)
        }

        resGen(res, 200, 'success', 'User registered for the contest')
    } catch (error) {
        throw new AppError(`Error registering user for contest:${error}`)
    }
})

// Controller function to cancel user registration for a contest
export const cancelContestRegistration = cathcAsync(async (req, res, next) => {
    try {
        const userId = req.user._id
        const contestId = req.params.contest

        const isRunning = await RunningContestModel.find({ userId, contestId })
        // console.log(isRunning)
        if (isRunning.length) return next(new AppError("Can't cancel registration after submission in contest", 400))

        const contest = await Contest.findById(contestId)

        if (!contest) return next(new AppError('Contest not found', 400))
        let ucm = await UserContest.findOne({ contestId, userId })
        let teamId = ucm.teamId
        ucm.members
            .forEach(async (member) => {
                let userId = member
                const e = await UserContest.erase({ contestId, userId, teamId })
                const updated = await Contest.findByIdAndUpdate(contestId, { $pull: { participatedUsers: userId } }, { new: true })
            })
            .resGen(res, 200, 'success', 'User registration canceled for the contest')
    } catch (error) {
        throw new AppError(`Error canceling user registration for contest:${error}`)
    }
})

export const addAdminToContest = asyncHandler(async (req, res, next) => {
    const { userId, contestId } = req.body
    if (!userId) next(new AppError('Please provide a user ID', 404))

    let isUserExist
    try {
        isUserExist = await userModel.findById(userId)
    } catch (err) {
        next(new AppError('User not found', 404))
    }
    if (!isUserExist) next(new AppError('User not found', 404))

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
        next(new AppError('SomeThing went wrong. try again latter..', StatusCodes.BAD_REQUEST))
    }
    return res.json({ success: true, admins })
})

export const removeAdminFromContest = asyncHandler(async (req, res, next) => {
    const { userId, contestId } = req.body
    let contest
    try {
        contest = await contestModel.findById(contestId)
    } catch (err) {
        next(new AppError('Contest not found', StatusCodes.NOT_FOUND))
    }
    if (JSON.stringify(userId) == JSON.stringify(contest.createdBy))
        next(new AppError('The onwer of the contest can  not be removed', StatusCodes.BAD_REQUEST))
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
        next(new AppError('SomeThing went wrong. try again latter..', StatusCodes.BAD_REQUEST))
    }
    return res.json({ success: true, admins })
})

// apifeatures
export const showContestProblems = asyncHandler(async (req, res, next) => {
    const contestId = req.params.contest
    const { skip, limit } = req.pagination

    let contestproblems
    try {
        contestproblems = await contestModel.findById(contestId, { problems: 1 }).skip(skip).limit(limit).populate('problems', {
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

// {{host}}/api/v1/judge/contest?contestId=65fac826bd7ff7f01908d554
// query = {} => all contests, query = id => single contest
export const showAllContests = asyncHandler(async (req, res, next) => {
    const searchObj = {}
    const { skip, limit } = req.pagination
    if (req.query.contestId) searchObj._id = req.query.contestId

    const allcontests = await contestModel.find(searchObj).skip(skip).limit(limit).populate('problems', '-testCases -existsIn')

    // get from the contest user relation the rank
    let ret = []
    for (let contest of allcontests) {
        const userContestRelation = await UserContest.findOne({
            contestId: contest._id,
            userId: req.user._id,
        })
        ret.push({ contest, userContestRelation })
        // console.log(userContestRelation)
    }

    res.status(StatusCodes.OK).json(ret)
})

// {{host}}/api/v1/judge/contest/problem
export const showProblemDetails = asyncHandler(async (req, res, next) => {
    const problemId = req.params.problem

    if (!problemId) return next(new AppError('Problem Id not provided !!', StatusCodes.BAD_REQUEST))

    let problem = undefined

    try {
        problem = await problemModel
            .findById(problemId, { testCases: { $slice: 3 }, existsIn: 0 })
            .populate('ProblemDataId', '-checker -_id -__v')
            .populate('testCases')
    } catch (err) {
        return next(new AppError(err.message, 400))
    }
    if (!problem) next(new AppError('Problem not found', 404))
    res.status(StatusCodes.OK).json(problem)
})
export const calculateRate = asyncHandler(async (req, res, next) => {
    const { contestId } = req.body
    try {
        let userC = await userContestModel.find({ contestId, entered: 1 })
        let ret = []
        for (let user of userC) {
            let temp = await AdditionalData.findOne({ userId: user.userId })
            //users must contain user.userId,user.rank,user.points,user.rating
            let obj = {}
            // console.log(temp)
            obj.rank = user.Rank
            obj.points = 10000000 - user.Rank
            obj.rating = temp.rating
            obj.userId = user.userId
            ret.push(obj)
        }
        let x = await calculateRatingChanges(ret, contestId)
        // console.log(x)
        // console.log(ret)
        Object.keys(x).forEach((key) => {
            console.log(`${key}: ${x[key].delta}`)
            // let up = AdditionalData.updateOne({ userId: key }, { $inc: { rating: x[key].delta } })
        })
        res.status(StatusCodes.OK).json(x)
    } catch (err) {
        return next(new AppError(err.message, 400))
    }
})
