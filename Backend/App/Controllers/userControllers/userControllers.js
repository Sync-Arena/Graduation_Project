import userModel from '../../../Database/Models/UserModels/userModels.js'
import APIFeatures from '../../../util/apiFeatures.js'
import AppError from '../../../util/appError.js'
import { resGen } from '../../MiddleWare/helpers/helper.js'
import { cathcAsync } from '../errorControllers/errorContollers.js'
import multer from 'multer'
import sharp from 'sharp'
import AdditionalData from '../../../Database/Models/UserModels/additionalDataModel.js'

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

    await userModel.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true, runValidators: true }
    )

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
    else
        cb(
            new AppError('Invlaid file format!!, please upload a photo', 400),
            false
        )
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

export const uploadPicture = upload.single('photo')

export const resizeImage = cathcAsync(async function (req, res, next) {
    req.filename = `user-${req.user._id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`./public/images/${req.filename}`)

    next()
})

// Controllers for any user
export const updateUserPhoto = cathcAsync(async function (req, res, next) {
    const user = req.user

    await userModel.findByIdAndUpdate(
        user._id,
        { profilePicture: req.filename },
        { new: true, runValidators: true }
    )

    res.status(200).json({
        user,
        status: 'success',
        message: 'Photo uploaded successfully.',
    })
})

export const showUserProfile = cathcAsync(async function (req, res, next) {
    const userId = req.params.userId
    const user = await userModel
        .findById(userId)
        .select('-password -tokens -__v')

    // check if user exists
    if (!user) return next(new AppError('User not found !!', 404))

    // Compute the number of solved problems for different time frames
    const numberOfSolvedProblemsLastYear =
        await user.countSolvedProblemsInLastYear()
    const numberOfSolvedProblemsLastMonth =
        await user.countSolvedProblemsInLastMonth()

    // Add the counts to the user object
    const userProfile = user.toObject()
    userProfile.numberOfSolvedProblems = user.additionalData.solvedProblems
        ? user.additionalData.solvedProblems.length
        : 0
    userProfile.numberOfSolvedProblemsLastYear = numberOfSolvedProblemsLastYear
        ? numberOfSolvedProblemsLastYear
        : 0
    userProfile.numberOfSolvedProblemsLastMonth =
        numberOfSolvedProblemsLastMonth ? numberOfSolvedProblemsLastMonth : 0

    resGen(res, 200, 'Success', 'Profile showed successfully', userProfile)
})

export const toggleFriend = cathcAsync(async function (req, res, next) {
  const userId = req.user._id;
  const friendId = req.params.userId;

  // Find the friend user by their id and extract the _id
  const friendUser = await userModel.findById(friendId)
  if (!friendUser) {
      return next(new AppError('Invalid user friend ID', 400));
  }
  if (userId.equals(friendId)) {
      return next(new AppError('You cannot add yourself', 400));
  }

  const user = await userModel.findById(userId);
  if (!user) {
      return next(new AppError('User not found', 404));
  }

  let message;

  if (user.additionalData.friends.includes(friendId)) {
      // Friend is already added, remove them
      await AdditionalData.findOneAndUpdate(
         {userId : userId},
          { $pull: { friends: friendId } },
          { new: true }
      );
      message = 'Friend removed successfully';
  } else {
      // Friend is not added, add them
      await AdditionalData.findOneAndUpdate(
          {userId : userId},
          { $addToSet: { friends: friendId } },
          { new: true }
      );
      message = 'Friend added successfully';
  }

  resGen(res, 200, 'Success', message);
});

export const showUserOfficailContests = cathcAsync(async function (req, res, next) {
    const userId = req.params.userId;
    const additionalDataUser = await AdditionalData.findOne({userId: userId}).populate({
        path: 'officialContests',
        populate: {
            path: 'contestId',
            model: 'Contest',
            select: 'contestName startTime'
        }
    });

    const user = userModel.findById(userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const contests = additionalDataUser.officialContests.map(contestRelation => ({
        contestId: contestRelation.contestId.id,
        contestName: contestRelation.contestId.contestName,
        startTime: contestRelation.contestId.startTime,
        rank: contestRelation.Rank,
        noOfSolvedProblems: contestRelation.solvedProblemsIds.length,
        ratingChange: (100 * contestRelation.solvedProblemsIds.length / contestRelation.Rank),
        newRating: user.rating + (100 * contestRelation.solvedProblemsIds.length / contestRelation.Rank),
    }));

    console.log(contests);
    resGen(res, 200, 'Success', "Here's the official contests of the user", contests);
});