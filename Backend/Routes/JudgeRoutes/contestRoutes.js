import express from "express";
import {
  createContest,
  showStanding,
} from "../../App/Controllers/JudgeControllers/contestControllers.js";

const router = express.Router();

router.route("/contest").post(createContest);

router.get("/contest/:id/standing", showStanding);

export default router;
