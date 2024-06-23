import express from 'express'

import {
    getMyTeams,
    getAllTeams,
    createTeam,
    getTeam,
    sendInvitationToUser,
    preInvitationHandler,
} from '../../App/Controllers/JudgeControllers/teamControllers.js'

const router = express.Router()

//base:  {{host}}/api/v1/judge/teams

router.route('/').get(getAllTeams).post(createTeam)
router.route('/myteams').get(getMyTeams)

router.route('/:teamId').get(getTeam).post(preInvitationHandler, sendInvitationToUser)

export default router
