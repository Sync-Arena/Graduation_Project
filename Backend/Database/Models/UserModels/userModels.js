import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { type } from 'os'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            validate: validator.isEmail,
            unique: true,
            sparse: true,
            trim: true,
        },
        userName: {
            type: String,
            required: [true, 'A user must has a username'],
            minLength: 3,
            maxLength: 50,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'A user must has a password'],
            minLength: 8,
            select: false,
            trim: true,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'You must confirm your password'],
            validate: {
                validator: function (val) {
                    return this.password === val
                },
                message: "Two passwords doesn't match",
            },
            trim: true,
        },
        changedPasswordAt: {
            type: Date,
            default: new Date(),
        },
        role: {
            type: String,
            trim: true,
            default: 'user',
            enum: {
                values: ['user', 'admin'],
                message: 'Invalid role !!',
            },
        },
        profilePicture: String,
        active: {
            type: Boolean,
            default: true,
        },
        tokens: [String],
        passwordResetToken: String,
        passwordResetExpires: Date,
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
        rating: {
            type: Number,
            default: 0,
        },
        coins: {
            type: Number,
            default: 0,
        },
        organization: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

// DOCUMENT MIDDLEWARE
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.passwordConfirm = this.password

        // change the last time the user has changed his password if it's old DOC
        if (!this.isNew) {
            this.tokens = []
            this.changedPasswordAt = new Date()
        }
    }
    // Ensure solvedProblems is initialized
    if (!this.solvedProblems) {
        this.solvedProblems = []
    }
    next()
})

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
    candidatePassword,
    currentPassword
) {
    return await bcrypt.compare(candidatePassword, currentPassword)
}

userSchema.methods.passwordChangedAfter = function (jwtTimeStamp) {
    if (this.changedPasswordAt) {
        const changedPasswordTime = Math.floor(
            this.changedPasswordAt.getTime() / 1000
        )
        return jwtTimeStamp < changedPasswordTime
    }
    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.passwordResetExpires = new Date(
        Date.now() + process.env.PASSWORD_RESET_EXPIRED * 60 * 1000
    )

    return resetToken
}

// Virtual Properties
userSchema.virtual('submissions', {
    localField: '_id',
    foreignField: 'user',
    ref: 'Submission',
})

// Count solved problems in the last year
userSchema.methods.countSolvedProblemsInLastYear = function () {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const recentSolvedProblems = this.solvedProblems.filter(
        (problem) => problem.solvedAt >= oneYearAgo
    )
    return recentSolvedProblems.length
}

// Count solved problems in the last month
userSchema.methods.countSolvedProblemsInLastMonth = function () {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const recentSolvedProblems = this.solvedProblems.filter(
        (problem) => problem.solvedAt >= oneMonthAgo
    )
    return recentSolvedProblems.length
}
const userModel = mongoose.model('User', userSchema)

export default userModel
