import express from "express";
import {
  createContest,
  AllSubmissionsOfContest,
  UserSubmissionsInContest,
  registerForContest,
  cancelContestRegistration,
} from "../../App/Controllers/JudgeControllers/contestControllers.js";

const router = express.Router();

router.route("/contest").post(createContest);

router.route("/contest/all-submissions").get(AllSubmissionsOfContest);

router.route("/contest/my-submissions").get(UserSubmissionsInContest);

router.route("/contest/register").post(registerForContest);

router.route("/contest/cancel-registration").post(cancelContestRegistration);

export default router;
