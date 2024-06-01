import mongoose from 'mongoose'

const teamSchema = mongoose.Schema({
    teamName: {
        type: 'string',
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    rank: {
        type: Number,
        default: 0,
    },
    coins: {
        type: Number,
        default: 0,
    },
})

teamSchema.virtual('teamSize').get(function () {
    return this.members.length
})

const TeamModel = mongoose.model('Team', teamSchema)

export default TeamModel
