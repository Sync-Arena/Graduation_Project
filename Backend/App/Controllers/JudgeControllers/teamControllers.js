import asyncHandler from 'express-async-handler'
import TeamModel from '../../../Database/Models/JudgeModels/teamModel.js'
import AppError from '../../../util/appError.js'
import { StatusCodes } from 'http-status-codes'
import { resGen } from '../../MiddleWare/helpers/helper.js'
import notificationsModel from '../../../Database/Models/UserModels/notificationsModel.js'

export const getAllTeams = asyncHandler(async (req, res, next) => {
    const { sort } = req.query
    const { skip, limit } = req.pagination
    if (sort) sort.replace(/,/g, ' ')

    try {
        const teams = await TeamModel.find({}).sort(sort).skip(skip).limit(limit)
        return resGen(res, 200, 'success', 'All Teams Found', teams)
    } catch (err) {
        return next(
            new AppError('something went wrong, please try again later', 400)
        )
    }
})
export const createTeam = asyncHandler(async (req, res, next) => {
    const { teamName } = req.body

    if (!teamName)
        return next(
            new AppError("Team name can't be empty", StatusCodes.BAD_REQUEST)
        )

    if (teamName.length > 100)
        return next(new AppError('Team name too long', StatusCodes.BAD_REQUEST))

    try {
        const team = await TeamModel.create({
            teamName,
            members: [req.user._id],
            rank: 0,
            coins: 0,
        })

        return resGen(
            res,
            StatusCodes.CREATED,
            'success',
            'Team created successfully !! ',
            team
        )
    } catch (err) {
        return next(
            new AppError(
                'something wnent wrong. Try again later',
                StatusCodes.BAD_REQUEST
            )
        )
    }
})
export const getTeam = asyncHandler(async (req, res, next) => {
    const { teamId } = req.params

    try {
        const team = await TeamModel.findById(teamId).populate(
            'members',
            '-tokens'
        )
        return resGen(res, 200, 'success', 'Team Details found', team)
    } catch (err) {
        return next(
            new AppError(
                'something wnent wrong. Try again later',
                StatusCodes.BAD_REQUEST
            )
        )
    }
})

export const preInvitationHandler = asyncHandler(async (req, res, next) => {
    const { members } = await TeamModel.findById(req.params.teamId, {
        members: 1,
    })
    if (!members.includes(req.user._id))
        return next(
            new AppError(
                'You must be a member of this team to do this action',
                400
            )
        )

    if (members.includes(req.params.userId))
        return next(new AppError('This User already exists in this team', 400))

    next()
})
export const sendInvitationToUser = asyncHandler(async (req, res, next) => {
    const { message } = req.body
    const { teamId, userId } = req.params

    const invitationObj = {
        type: 'teamInvitaion',
        recipient: userId,
        sender: teamId,
        senderModel: 'Team',
        message,
    }

    try {
        const invitation = await notificationsModel.create(invitationObj)
        return resGen(
            res,
            201,
            'success',
            'Invitation Sent Successfully',
            invitation
        )
    } catch (err) {
        return next(new AppError(err.message, 400))
    }
})
