import mongoose from 'mongoose'

const userContest = new mongoose.Schema(
    {
        contestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contest',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        Rank: {
            type: Number,
            default: 100000,
        },

        Penality: {
            type: Number,
            default: 0,
        },
        entered: {
            type: Number,
            default: 0,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        solvedProblemsIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'problem',
            },
        ],
    },
    { timestamps: true }
)

const userContestModel = mongoose.model('UserContestRelation', userContest)

export default userContestModel
