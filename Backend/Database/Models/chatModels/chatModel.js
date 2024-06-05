import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const chatModel = mongoose.model('Chat', chatSchema)

export default chatModel
