import asyncHandler from 'express-async-handler'
import chatModel from '../../../Database/Models/chatModels/chatModel.js'
import AppError from '../../../util/appError.js'
import { resGen } from '../../MiddleWare/helpers/helper.js'
import messageModel from '../../../Database/Models/chatModels/messageModel.js'

export const getMyChats = asyncHandler(async (req, res, next) => {
    const { skip, limit } = req.pagination
    const myChats = await chatModel
        .find({ users: { $elemMatch: { $eq: req.user._id } } })
        .skip(skip)
        .limit(limit)
        .populate({ path: 'users', select: '-additionalData -tokens -changedPasswordAt -passwordConfirm' })

    return resGen(res, 200, 'success', 'my chats', myChats)
})
export const createChatIfDoesNotExist = asyncHandler(async (req, res, next) => {
    const otherPerson = req.body.userId
    const me = req.user._id

    if (!otherPerson) return next(new AppError('Wrong person Id', 400))
    let chat

    try {
        chat = await chatModel
            .find({ $or: [{ users: [me, otherPerson] }, { users: [otherPerson, me] }] })
            .populate({ path: 'users', select: '-additionalData -tokens -changedPasswordAt -passwordConfirm' })
            .populate('lastMessage')
    } catch (err) {
        return next(new AppError(err.message, 400))
    }

    if (chat.length) return resGen(res, 200, 'success', 'chat already exists', chat)

    try {
        chat = await chatModel
            .create({
                users: [me, otherPerson],
            })
            .populate({ path: 'users', select: '-additionalData -tokens -changedPasswordAt -passwordConfirm' })
            .populate('lastMessage')
    } catch (err) {
        return next(new AppError(err.message, 400))
    }

    return resGen(res, 201, 'success', 'chat created', chat)
})
export const accessChat = asyncHandler(async (req, res, next) => {
    const { skip, limit } = req.pagination

    const messages = await messageModel.find({ chatId: req.chat._id }).sort({ createdAt: -1 }).skip(skip).limit(limit)
    return resGen(
        res,
        200,
        'success',
        { content: 'chat and messages', messagesNumber: messages.length, chatmembers: req.chat.users.length },
        { chat: req.chat, messages }
    )
})
export const sendMessage = asyncHandler(async (req, res, next) => {
    const { content } = req.body

    const message = await messageModel.create({ sender: req.user._id, content, chatId: req.chat._id })

    await chatModel.findByIdAndUpdate(req.params.chatId, { lastMessage: message })

    return resGen(res, 201, 'success', 'message created', message)
})

export const isChatMember = asyncHandler(async (req, res, next) => {
    const { chatId } = req.params
    if (!chatId) return next(new AppError('chat not found', 404))
    req.chat = await chatModel
        .findById(chatId)
        .populate({ path: 'users', select: '-additionalData -tokens -changedPasswordAt -passwordConfirm' })
        .populate('lastMessage')

    if (!req.chat.users.map((user) => user._id).includes(req.user._id)) return next(new AppError('You are not allowed to access this chat', 403))

    next()
})
