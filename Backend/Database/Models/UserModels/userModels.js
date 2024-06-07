import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { type } from 'os'
import AdditionalData from './additionalDataModel.js'

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
        additionalData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AdditionalData',
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
    // Ensure each new user has an AdditionalData document
    if (this.isNew) {
        const additionalData = await AdditionalData.create({ userId: this._id });
        this.additionalData = additionalData._id;
    }
    next()
})

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } }).populate('additionalData');
    next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (candidatePassword, currentPassword) {
    return await bcrypt.compare(candidatePassword, currentPassword)
}

userSchema.methods.passwordChangedAfter = function (jwtTimeStamp) {
    if (this.changedPasswordAt) {
        const changedPasswordTime = Math.floor(this.changedPasswordAt.getTime() / 1000)
        return jwtTimeStamp < changedPasswordTime
    }
    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.passwordResetExpires = new Date(Date.now() + process.env.PASSWORD_RESET_EXPIRED * 60 * 1000)

    return resetToken
}

// Virtual Properties
userSchema.virtual('submissions', {
    localField: '_id',
    foreignField: 'user',
    ref: 'Submission',
})

// Count solved problems in the last year
userSchema.methods.countSolvedProblemsInLastYear = async function () {
    if (!this.additionalData) await this.populate('additionalData').execPopulate();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const recentSolvedProblems = this.additionalData.solvedProblems.filter(
        problem => problem.solvedAt >= oneYearAgo
    );
    return recentSolvedProblems.length;
};


// Count solved problems in the last month
userSchema.methods.countSolvedProblemsInLastMonth = async function () {
    if (!this.additionalData) await this.populate('additionalData').execPopulate();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const recentSolvedProblems = this.additionalData.solvedProblems.filter(
        problem => problem.solvedAt >= oneMonthAgo
    );
    return recentSolvedProblems.length;
};

const userModel = mongoose.model('User', userSchema)

export default userModel
