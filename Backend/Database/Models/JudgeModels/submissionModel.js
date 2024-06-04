import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
    {
        sourceCode: {
            type: String,
            trim: true,
            required: true,
        },
        languageName: {
            type: String,
            required: true,
        },
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem',
        },
        virtualId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RunningContest',
        },
        problemName: {
            type: String,
            required: true,
        },
        status: [
            {
                description: String,
                pr: String,
            },
        ],
        stdin: [String],
        stdout: [String],
        answers: [String],

        wholeStatus: String,
        time: String,
        memory: Number,
        // offical => 0 = pratice  1 = offical    2 = virtual
        isOfficial: Number,
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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contest',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

submissionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'userName',
    })
    next()
})

//populate({ path: "contest", select: "-__v" })

const submissionModel = mongoose.model('Submission', submissionSchema)

export default submissionModel
