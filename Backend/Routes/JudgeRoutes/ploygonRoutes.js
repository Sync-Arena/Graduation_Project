import { handlePolygonGETRequest } from "../../App/Controllers/JudgeControllers/poygonControllers.js"
import express from "express"

const router = express.Router()

router.route("/:methodName").get(handlePolygonGETRequest)

export default router
