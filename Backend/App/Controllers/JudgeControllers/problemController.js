import asyncHandler from "express-async-handler"
import axios from "axios"
import getURL from "../../../util/apiPolygon.js"
import AppError from "../../../util/appError.js"
import getChecker from "../../../util/stdCheckers.js"
import problemModel, {
	problemTestCasesModel,
	problemDataModel,
} from "../../../Database/Models/JudgeModels/ProblemModel.js"
import { StatusCodes } from "http-status-codes"
import { resGen } from '../../MiddleWare/helpers/helper.js'

export const createProblem = asyncHandler(async (req, res, next) => {
    const { polygonId } = req.body
    // does problem exist already?
    const problem = await problemModel.findOne({ polygonId })
    // console.log(problem)
    let problemInfo
    try {
        problemInfo = await axios.get(getURL('problem.info', { problemId: polygonId }))
    } catch (err) {
        return next(new AppError(err.response.data.comment))
    }
    const { timeLimit, memoryLimit } = problemInfo.data.result

    const problemStatements = await axios.get(getURL('problem.statements', { problemId: polygonId }))
    const { english: statement } = problemStatements.data.result

    const problemTests = await axios.get(getURL('problem.tests', { problemId: polygonId, testset: 'tests' }))
    const testsIndexs = []
    for (const obj of problemTests.data.result) {
        testsIndexs.push(obj.index)
    }

    const problemCheckerName = await axios.get(getURL('problem.checker', { problemId: polygonId }))
    const checkerName = problemCheckerName.data.result
    let checkerContent = ''
    try {
        const getCheckerFile = await axios.get(
            getURL('problem.viewFile', {
                problemId: polygonId,
                type: 'source',
                name: checkerName,
            })
        )
        checkerContent = getCheckerFile.data
    } catch (err) {}

    if (!checkerContent) checkerContent = getChecker(checkerName)

    if (!checkerContent) next(new AppError('checker not found !!', 404))

    // adding problem data
    const problemDataCreateObj = {
        title: statement.name,
        legend: statement.legend,
        input: statement.input,
        output: statement.output,
        notes: statement.notes,
        tutorial: statement.tutorial,
        checker: checkerContent,
    }
    try {
        let problemData
        if (!problem) problemData = await problemDataModel.create(problemDataCreateObj)
        else problemData = await problemDataModel.findByIdAndUpdate(problem.ProblemDataId, problemDataCreateObj, { new: true, validate: true })
        // adding test cases
        let testCases = []
        for (let i = 0; i < testsIndexs.length; i++) {
            const input = await axios.get(
                getURL('problem.testInput', {
                    problemId: polygonId,
                    testset: 'tests',
                    testIndex: testsIndexs[i],
                })
            )
            const answer = await axios.get(
                getURL('problem.testAnswer', {
                    problemId: polygonId,
                    testset: 'tests',
                    testIndex: testsIndexs[i],
                })
            )
            const testCaseData = {
                input: input.data,
                answer: answer.data,
            }
            // console.log(problem.testCases.length, i)
            let testCase
            if (!problem || problem.testCases.length <= i) testCase = await problemTestCasesModel.create(testCaseData)
            else testCase = await problemTestCasesModel.findByIdAndUpdate(problem.testCases[i], testCaseData, { new: true, validate: true })
            testCases.push(testCase._id)
        }

        // creating the problem itself
        const newproblemData = {
            polygonId,
            name: problemData.title,
            timeLimit,
            memoryLimit,
            ProblemDataId: problemData._id,
            testCases,
            ownerId: req.user._id,
        }
        let newProblem
        if (!problem) newProblem = await problemModel.create(newproblemData)
        else newProblem = await problemModel.findByIdAndUpdate(problem._id, newproblemData, { new: true, validate: true })

        return res.status(201).json({ status: 'problem created', problem: newProblem })
    } catch (err) {
        next(new AppError('Something went wrong, please try again later', StatusCodes.BAD_REQUEST))
    }
})
// apifeatures
export const getMyProblems = asyncHandler(async (req, res, next) => {
    let myproblems
    const { skip, limit } = req.pagination

    try {
        myproblems = await problemModel
            .find({ ownerId: { $eq: req.user._id } }, { testCases: 0, ProblemDataId: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            .skip(skip)
            .limit(limit)
    } catch (err) {
        next(new AppError('Something went wrong, please try again later', StatusCodes.BAD_REQUEST))
    }
    res.status(StatusCodes.OK).json({ myproblems })
})
export const getallproblems = asyncHandler(async (req, res, next) => {
    const { skip, limit } = req.pagination
    const problems = await problemModel.find().select("-testCases").limit(limit).skip(skip)

    return resGen(res, 200, 'success', {problemscount : problems.length}, problems)
})