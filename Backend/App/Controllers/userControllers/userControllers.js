import userModel from '../../../Database/Models/UserModels/userModels.js'
import APIFeatures from '../../../util/apiFeatures.js'
import AppError from '../../../util/appError.js'
import { resGen } from '../../MiddleWare/helpers/helper.js'
import { cathcAsync } from '../errorControllers/errorContollers.js'
import multer from 'multer'
import sharp from 'sharp'
import AdditionalData from '../../../Database/Models/UserModels/additionalDataModel.js'
import problemModel from '../../../Database/Models/JudgeModels/ProblemModel.js'

// Controllers for only -> Admins

export const addUser = cathcAsync(async function (req, res, next) {
    const user = await userModel.create(req.body)
    resGen(res, 201, 'success', 'User added to the system', user)
})

export const showAllUsers = cathcAsync(async function (req, res, next) {
    // filter Results
    const query = new APIFeatures(req).filter().sort().paginate().select().query

    // send response
    resGen(res, 200, 'success', 'All users showed successfully', await query)
})

export const showSingleUser = cathcAsync(async function (req, res, next) {
    const user = await userModel.findById(req.params.id).select('-__v')

    // check if user exists
    if (!user) return next(new AppError('User not found !!', 404))

    resGen(res, 200, 'success', 'User showed successfully', user)
})

export const deleteUser = cathcAsync(async function (req, res, next) {
    const user = await userModel.findById(req.params.id)
    if (!user) return next(new AppError('User not found !!', 404))

    await userModel.findByIdAndUpdate(req.params.id, { active: false }, { new: true, runValidators: true })

    resGen(res, 204, 'success', 'User deleted successfully', user)
})

export const deleteAllUsers = cathcAsync(async function (req, res, next) {
    await userModel.deleteMany()
    resGen(res, 204, 'success', 'All users deleted form DB !!')
})

export const getUserStatistics = cathcAsync(async function (req, res, next) {
    const stats = await userModel.aggregate([
        {
            $match: { userName: /^Admin/ },
        },
        {
            $group: {
                _id: '$active',
                sm: { $sum: 1 },
                lower: { $min: '$userName' },
            },
        },
        {
            $sort: { userName: 1 },
        },
        {
            $addFields: { Active: '$_id' },
        },
        {
            $project: { _id: 0 },
        },
    ])
    resGen(res, 200, 'Success', 'statistics showed successfully', stats)
})

export const showMySubmissions = cathcAsync(async function (req, res, next) {
    const user = await userModel.findById(req.user._id).populate('submissions')

    res.status(200).json({
        status: 'Success',
        message: 'Submissions showed successfully',
        user,
    })
})

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true)
    else cb(new AppError('Invlaid file format!!, please upload a photo', 400), false)
}

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({
    storage: multerStorage
})

export const uploadPicture = upload.single('photo')

export const resizeImage = cathcAsync(async function (req, res, next) {
    req.filename = `user-${req.user._id}-${Date.now()}.jpeg`
    console.log(req.filename)

    // await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`./public/images/${req.filename}`)

    next()
})

// Controllers for any user
export const updateUserPhoto = cathcAsync(async function (req, res, next) {
    
    const user = req.user
    console.log(user._id)
    let data 

    try{
    data = await AdditionalData.findOneAndUpdate({ userId: user._id}, { pic: {data: req.file.buffer, contentType :req.file.mimetype } }, { new: true })
}catch(err){
    return next(new AppError("can't upload photo"))
}
    res.status(200).json({
        data,
        status: 'success',
        message: 'Photo uploaded successfully.',
    })
})

export const showUserProfile = cathcAsync(async function (req, res, next) {
    const userId = req.params.userId
    const user = await userModel.findById(userId).select('-password -tokens -__v')

    // check if user exists
    if (!user) return next(new AppError('User not found !!', 404))

    // Compute the number of solved problems for different time frames
    const numberOfSolvedProblemsLastYear = await user.countSolvedProblemsInLastYear()
    const numberOfSolvedProblemsLastMonth = await user.countSolvedProblemsInLastMonth()

    // Add the counts to the user object
    const userProfile = user.toObject()
    userProfile.numberOfSolvedProblems = user.additionalData.solvedProblems ? user.additionalData.solvedProblems.length : 0
    userProfile.numberOfSolvedProblemsLastYear = numberOfSolvedProblemsLastYear ? numberOfSolvedProblemsLastYear : 0
    userProfile.numberOfSolvedProblemsLastMonth = numberOfSolvedProblemsLastMonth ? numberOfSolvedProblemsLastMonth : 0

    resGen(res, 200, 'Success', 'Profile showed successfully', userProfile)
})

export const toggleFriend = cathcAsync(async function (req, res, next) {
    const userId = req.user._id
    const friendId = req.params.userId

    // Find the friend user by their id and extract the _id
    const friendUser = await userModel.findById(friendId)
    if (!friendUser) {
        return next(new AppError('Friend user not found', 404))
    }
    if (userId.equals(friendId)) {
        return next(new AppError('You cannot add yourself', 400))
    }

    const user = await userModel.findById(userId)
    if (!user) {
        return next(new AppError('User not found', 404))
    }

    let message

    if (user.additionalData.friends.includes(friendId)) {
        // Friend is already added, remove them
        await AdditionalData.findOneAndUpdate({ userId: userId }, { $pull: { friends: friendId } }, { new: true })
        message = 'Friend removed successfully'
    } else {
        // Friend is not added, add them
        await AdditionalData.findOneAndUpdate({ userId: userId }, { $addToSet: { friends: friendId } }, { new: true })
        message = 'Friend added successfully'
    }

    resGen(res, 200, 'Success', message)
})

export const showMyFriends = cathcAsync(async function (req, res, next) {
    const userId = req.user._id
    const additionalDataUser = await AdditionalData.findOne({ userId: userId }).populate({
        path: 'friends',
        select: 'userName',
    })

    if (!additionalDataUser) {
        return next(new AppError('No additional data for this user', 404))
    }
    resGen(res, 200, 'Success', "Here's your friends data", additionalDataUser.friends)
})
export const showUserOfficailContests = cathcAsync(async function (req, res, next) {
    const userId = req.params.userId
    const additionalDataUser = await AdditionalData.findOne({ userId: userId }).populate({
        path: 'officialContests',
        populate: {
            path: 'contestId',
            model: 'Contest',
            select: 'contestName startTime',
        },
    })

    const contests = additionalDataUser.officialContests.map((contestRelation) => ({
        contestId: contestRelation.contestId.id,
        contestName: contestRelation.contestId.contestName,
        startTime: contestRelation.contestId.startTime,
        rank: contestRelation.Rank,
        noOfSolvedProblems: contestRelation.solvedProblemsIds.length,
        ratingChange: (100 * contestRelation.solvedProblemsIds.length) / contestRelation.Rank,
        newRating: additionalDataUser.rating + (100 * contestRelation.solvedProblemsIds.length) / contestRelation.Rank,
    }))

    console.log(contests)
    resGen(res, 200, 'Success', "Here's the official contests of the user", contests)
})

export const toggleFavouriteProblem = cathcAsync(async function (req, res, next) {
    const userId = req.user._id
    const problemId = req.params.problemId

    const problem = await problemModel.findById(problemId)
    if (!problem) {
        return next(new AppError('Problem not found', 404))
    }

    // Fetch the user's AdditionalData document
    const userAdditionalData = await AdditionalData.findOne({ userId: userId })
    if (!userAdditionalData) {
        return next(new AppError('AdditionalData not found for the user', 404))
    }

    let message

    if (userAdditionalData.favouriteProblems.includes(problemId)) {
        // Problem is already added, remove it
        await AdditionalData.findOneAndUpdate({ userId: userId }, { $pull: { favouriteProblems: problemId } }, { new: true })
        message = 'Problem removed from favourites successfully'
    } else {
        // Problem is not added, add it
        await AdditionalData.findOneAndUpdate({ userId: userId }, { $addToSet: { favouriteProblems: problemId } }, { new: true })
        message = 'Problem added to favourites successfully'
    }

    resGen(res, 200, 'Success', message)
})

export const showMyFavouriteProblems = cathcAsync(async function (req, res, next) {
    const userId = req.user._id

    // Fetch the user's AdditionalData document and populate favouriteProblems
    const userAdditionalData = await AdditionalData.findOne({ userId: userId }).populate({
        path: 'favouriteProblems',
        select: 'name _id numberOfSolvers',
    })
    if (!userAdditionalData) {
        return next(new AppError('AdditionalData not found for the user', 404))
    }

    resGen(res, 200, 'Success', "Here's the favourite problems of the user", userAdditionalData.favouriteProblems)
})

const calculateSimilarity = (rating1, rating2) => {
    let diff = rating1 - rating2
    return 1 / (1 + diff * diff) // Inverse of square difference
}
export const recommender = cathcAsync(async function (req, res, next) {
    const userId = req.user._id

    const user = await AdditionalData.findOne({ userId })
    const allUsers = await AdditionalData.find()

    const recommendations = {}
    // console.log(user)
    allUsers.forEach((otherUser) => {
        console.log(otherUser)
        if (otherUser.userId !== user.userId) {
            const similarity = calculateSimilarity(user.rating, otherUser.rating)
            otherUser.solvedProblems.forEach((problem) => {
                if (!user.solvedProblems || !user.solvedProblems.some((e) => e.problemId === problem.problemId)) {
                    if (!recommendations[problem.problemId]) {
                        recommendations[problem.problemId] = 0
                    }
                    // console.log(similarity, otherUser.userId)
                    recommendations[problem.problemId] += similarity // Weighted by similarity
                }
            })
        }
    })

    const sortedRecommendations = Object.entries(recommendations)
        .sort(([, weightA], [, weightB]) => weightB - weightA) // Sort by weight
        .map(([problemId]) => problemId)
    // console.log(sortedRecommendations)
    resGen(res, 200, 'Success', "Here's the recommended problems of the user", sortedRecommendations)
})
