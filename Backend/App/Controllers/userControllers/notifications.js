import asyncHandler from 'express-async-handler'
import notificationsModel from '../../../Database/Models/UserModels/notificationsModel.js'
import { resGen } from '../../MiddleWare/helpers/helper.js'
import AppError from '../../../util/appError.js'
import TeamModel from '../../../Database/Models/JudgeModels/teamModel.js'

export const showAllNotifications = asyncHandler(async (req, res, next) => {
    const { skip, limit } = req.pagination

    try {
        const myNotifications = await notificationsModel
            .find({
                recipient: req.user._id,
            })
            .skip(skip)
            .limit(limit)

        return resGen(res, 200, { status: 'success', count: myNotifications.length }, 'all notifications', myNotifications)
    } catch (err) {
        return next(new AppError('something went wrong, please try again later', 400))
    }
})

export const showNotificationInDetail = asyncHandler(async (req, res, next) => {
    const { notificationId } = req.params

    try {
        const notification = await notificationsModel
            .findByIdAndUpdate(
                notificationId,
                {
                    status: 'read',
                },
                { new: true }
            )
            .populate('sender')

        resGen(res, 200, 'success', 'notification showed successfully', notification)
    } catch (err) {
        return next(new AppError(err.message, 400))
    }
})

const acceptInvitation = asyncHandler(async (req, res, next) => {
    const { accept } = req.body

    if (accept != true) return resGen(res, 200, 'success', 'replied to invitation', 'the invitation has not been accepted yet')

    try {
        const team = await TeamModel.findByIdAndUpdate(req.notification.sender, { $addToSet: { members: req.user._id } }, { new: true })

        return resGen(res, 200, 'success', 'invition accepted', team)
    } catch (err) {
        return next(new AppError(err.message, 400))
    }
})

export const replayToNotification = asyncHandler(async (req, res, next) => {
    const { notificationId } = req.params

    req.notification = await notificationsModel.findById(notificationId)

    switch (req.notification.type) {
        case 'teamInvitaion':
            return acceptInvitation(req, res, next)
        default:
            return next(new AppError('Invalid notification type', 400))
    }
})
