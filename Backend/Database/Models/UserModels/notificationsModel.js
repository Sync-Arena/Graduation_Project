import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["teamInvitaion",'message', 'alert', 'reminder', 'other'], // Define possible types
    },
    recipient: {//who will receive
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel',
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Team'],
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    readAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
    },
    link: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
});

export default mongoose.model('Notification', notificationSchema);
