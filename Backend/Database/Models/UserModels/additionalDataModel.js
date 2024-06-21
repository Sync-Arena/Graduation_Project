import mongoose from 'mongoose'

const additionalDataSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        solvedProblems: [
            {
                _id: false,
                problemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Problem',
                },
                solvedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        officialContests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserContestRelation',
            },
        ],
        country: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        coins: {
            type: Number,
            default: 0,
        },
        organization: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            default: 1500,
        },
        maxRating: {
            type: Number,
            default: 1500,
        },
        favouriteProblems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Problem',
            },
        ],
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],
        pic: {
            data: Buffer,
            contentType: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

additionalDataSchema.path('solvedProblems').default([])
additionalDataSchema.path('officialContests').default([])
additionalDataSchema.path('friends').default([])
additionalDataSchema.path('favouriteProblems').default([])

const AdditionalData = mongoose.model('AdditionalData', additionalDataSchema)

export default AdditionalData
