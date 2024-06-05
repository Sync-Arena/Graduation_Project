import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    createdAt: { type: Date, default: Date.now },
})

const messageModel = mongoose.model('Message', messageSchema)


export default messageModel