const db = require('../db.js');
const express = require('express');
const team = require('../controllers/teamCtrl');

const router = express.Router();

router.get('/getTeam/:id', team.index)
//###########################//###########################//###########################
//###########################//###########################//###########################
//###########################//###########################//###########################
router.patch('/edit_team', team.edit_team)

router.post('/teamInvite', team.teamInvite)

router.post('/kickFromTeam', team.kickFromTeam)

router.post('/acceptTeamInvite', team.acceptTeamInvite)

router.post('/declineTeamInvite', team.declineTeamInvite)

router.post('/createTeam', team.create)

router.post('/createTeamsMessage', team.createMessage)
//###########################//###########################//###########################
//###########################//###########################//###########################
//###########################//###########################//###########################

router.post('/joinTeam', team.join)

router.post('/leaveTeam', team.leave)
//###########################//###########################//###########################
//###########################//###########################//###########################
//###########################//###########################//###########################

router.post('/addLike', team.addLike)

router.post('/addDislike', team.addDislike)

router.post('/removeLike', team.removeLike)

router.post('/removeDislike', team.removeDislike)

module.exports = router
