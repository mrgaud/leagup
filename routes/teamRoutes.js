const db = require('../db.js');
const express = require('express');
const team = require('../controllers/teamCtrl');

const router = express.Router();

router.get('/getTeam/:id', team.index)

router.post('/createTeam', team.create)

router.post('/createTeamsMessage', team.createMessage)

router.post('/joinTeam', team.join)

router.post('/leaveTeam', team.leave)

module.exports = router
