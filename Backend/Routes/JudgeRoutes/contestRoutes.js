import express from "express";
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
} from "../../App/Controllers/JudgeControllers/contestControllers.js"
import { isContestAdmin } from "../../App/MiddleWare/Judge/contestAdminsMiddleware.js";

const router = express.Router();

router.route("/contest").post(createContest).get(showAllContests);
router
  .route("/contest/admin")
  .post(isContestAdmin, addAdminToContest)
  .delete(isContestAdmin, removeAdminFromContest);

router
  .route("/contest/problem")
  .get(showProblemDetails)
  .post(isContestAdmin, addProblem)
  .delete(isContestAdmin, deleteProblem);

router.route("/contest/problems").get(showContestProblems)

router.route("/contest/all-submissions").get(AllSubmissionsOfContest);

router.route("/contest/my-submissions").get(UserSubmissionsInContest);

router.route("/contest/register").post(registerForContest);

router.route("/contest/cancel-registration").post(cancelContestRegistration);

export default router;
