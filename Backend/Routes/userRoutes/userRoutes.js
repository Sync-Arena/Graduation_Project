import express from 'express'

import {
    addUser,
    deleteAllUsers,
    deleteUser,
    getUserStatistics,
    resizeImage,
    showAllUsers,
    showSingleUser,
    updateUserPhoto,
    uploadPicture,
    showMySubmissions,
    showUserProfile,
    toggleFriend,
    showUserOfficailContests,
    toggleFavouriteProblem,
    showMyFavouriteProblems,
    showMyFriends,
    recommender,
} from '../../App/Controllers/userControllers/userControllers.js'

import {
    signUp,
    signIn,
    userAuth,
    changePassword,
    logOut,
    forgotPassword,
    resetPassword,
} from '../../App/MiddleWare/Authentication/userAuthentication.js'

import { admiAuth } from '../../App/MiddleWare/Authentication/adminAuthentication.js'

const userRouter = express.Router()

// Routes allowed for any user
userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.post('/forgotpassword', forgotPassword)
userRouter.patch('/resetpassword/:token', resetPassword)
userRouter.route('/profile/:userId').get(showUserProfile).patch(userAuth, toggleFriend)
userRouter.get('/profile/friends', userAuth, showMyFriends)
userRouter.get('/recommend', userAuth, recommender)
userRouter.get('/contests/with/:userId', showUserOfficailContests)
userRouter.patch('/favourites/:problemId', userAuth, toggleFavouriteProblem)
userRouter.get('/favourites', userAuth, showMyFavouriteProblems)

// Authenticaion Middleware
userRouter.use(userAuth)

userRouter.post('/changepassword', changePassword)
userRouter.get('/logout', logOut)
userRouter.post('/uploadprofilepicture', uploadPicture, resizeImage, updateUserPhoto)
userRouter.get('/showmysubmissions', showMySubmissions)

// Routes allowed only for admins

// Authorization Middleware -> but we use authentication middleware above ...
userRouter.use(admiAuth('admin'))

userRouter.route('/').get(showAllUsers).post(addUser).delete(deleteAllUsers)
userRouter.get('/showstatistics', getUserStatistics)
userRouter.route('/:id').get(showSingleUser).patch(deleteUser)

export default userRouter
