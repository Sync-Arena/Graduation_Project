import express from 'express'
import {
    addAdminToContest,
    addProblem,
    createContest,
    deleteProblem,
    removeAdminFromContest,
    AllSubmissionsOfContest,
    UserSubmissionsInContest,
    registerForContest,
    cancelContestRegistration,
    showContestProblems,
    showAllContests,
    showProblemDetails,
    showStanding,
    createUsersObjects,
    sortUsers,
    calculateRate,
} from '../../App/Controllers/JudgeControllers/contestControllers.js'
import { isContestAdmin } from '../../App/MiddleWare/Judge/contestAdminsMiddleware.js'
import { startVitualContest } from '../../App/Controllers/JudgeControllers/vitualControllers.js'
import { isInRunningContest, virualTimeForContest } from '../../App/MiddleWare/Judge/runningContestMiddleware.js'

const router = express.Router()

router.route('/contest').post(createContest).get(showAllContests)
router.route('/contest/admin').post(isContestAdmin, addAdminToContest).delete(isContestAdmin, removeAdminFromContest)

router.route('/:contest/problems').get(showContestProblems)
router.route('/contest/calculate-rate').get(calculateRate)

router.route('/:contest/all-submissions').get(virualTimeForContest, AllSubmissionsOfContest)

router.route('/:contest/my-submissions').get(virualTimeForContest, UserSubmissionsInContest)

router.route('/:contest/register').post(registerForContest)

router.route('/:contest/cancel-registration').get(cancelContestRegistration)

router.route('/:contest/vitual').get(isInRunningContest, startVitualContest)

router.route('/contest/:contestId/standing').get(virualTimeForContest, createUsersObjects, sortUsers, showStanding)

router.route('/contest/:problem').get(showProblemDetails).post(isContestAdmin, addProblem).delete(isContestAdmin, deleteProblem)

export default router
