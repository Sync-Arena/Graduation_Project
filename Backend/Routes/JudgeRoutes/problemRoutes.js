import express from "express"
import {
	createProblem,
	getMyProblems,
} from "../../App/Controllers/JudgeControllers/problemController.js"

const router = express.Router()

router.route("/problemCreate-update").post(createProblem)
router.route("/myproblems").get(getMyProblems)


export default router