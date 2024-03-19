import express from "express"
import {
	addAdminToContest,
	addProblem,
	createContest,
	deleteProblem,
	removeAdminFromContest,
} from "../../App/Controllers/JudgeControllers/contestControllers.js"
import { isContestAdmin } from "../../App/MiddleWare/Judge/contestAdminsMiddleware.js"

const router = express.Router()

router.route("/contest").post(createContest)
router
	.route("/contest/admin")
	.post(isContestAdmin, addAdminToContest)
	.delete(isContestAdmin, removeAdminFromContest)

router
	.route("/contest/problem")
	.post(isContestAdmin, addProblem)
	.delete(isContestAdmin, deleteProblem)


export default router