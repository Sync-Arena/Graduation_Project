import express from "express"
import { createContest } from "../../App/Controllers/JudgeControllers/contestControllers.js"

const router = express.Router()


router.route("/contest").post(createContest)




export default router