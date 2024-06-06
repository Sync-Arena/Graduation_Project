import submissionModel from '../../../Database/Models/JudgeModels/submissionModel.js'
import { cathcAsync } from '../errorControllers/errorContollers.js'

export const createSubmission = cathcAsync(async function (req, res, next) {
    // console.log(req.submissionModel)
    let submission
    req.members.forEach(async (element) => {
        let obj = req.submissionModel
        obj.teamId = req.teamId
        obj.members = req.members
        submission = await submissionModel.create(obj)
    })
    /// update the number of users to solve the problem in problem schema ===> to be done
    // check if the problem is solved before from user-contest relation
    res.status(201).json({
        message: 'Submission created successfully',
        submission,
    })
})

export const allUsersSubmissions = cathcAsync(async function (req, res, next) {
    const { skip, limit } = req.pagination
    // Note: populate is called in query Middleware
    const users = await submissionModel.find().skip(skip).limit(limit)

    res.status(200).json({
        meassage: 'submissions Showed Successfully',
        users,
    })
})
//2024-05-24T18:23:37.066Z
