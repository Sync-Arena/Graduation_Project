import express from "express"
import { createProblem } from "../../App/Controllers/JudgeControllers/problemController.js"

const router = express.Router()

router.route("/problemCreate-update").post(createProblem)


export default router