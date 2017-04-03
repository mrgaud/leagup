const db = require('../db.js');
const express = require('express');
const team = require('../controllers/teamCtrl');

const router = express.Router();

router.get('/getTeam/:id', team.index)

router.post('/create_team', team.create)

router.post('/joinTeam', team.join)

router.post('/leaveTeam', team.leave)

module.exports = router
