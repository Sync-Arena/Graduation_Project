import express from 'express';

import {
getAllTeams,
createTeam,
getTeam,
sendInvitationToUser,
preInvitationHandler,
} from "../../App/Controllers/JudgeControllers/teamControllers.js"





const router = express.Router();

//base:  {{host}}/api/v1/judge/teams

router.route("/").get(getAllTeams).post(createTeam)

router.route("/:teamId").get(getTeam)   // with users' details

router.route("/:teamId/:userId").post(preInvitationHandler ,sendInvitationToUser)


export default router