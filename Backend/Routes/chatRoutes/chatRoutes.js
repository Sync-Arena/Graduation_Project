import express from 'express'

import { getMyChats, createChatIfDoesNotExist, accessChat, sendMessage, isChatMember } from '../../App/Controllers/chatControllers/chatControllers.js'

const router = express.Router()

// base: {{host}}/api/v1/chat/

router.route('/').get(getMyChats).post(createChatIfDoesNotExist)

router.route('/:chatId').get(isChatMember, accessChat).post(isChatMember, sendMessage)

export default router
