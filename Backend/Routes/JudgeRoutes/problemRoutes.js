import express from "express"
import {
	createProblem,
	getMyProblems,
	getallproblems
} from "../../App/Controllers/JudgeControllers/problemController.js"

const router = express.Router()

router.route("/problemCreate-update").post(createProblem)
router.route("/myproblems").get(getMyProblems)
router.route("/problemset").get(getallproblems)

export default router