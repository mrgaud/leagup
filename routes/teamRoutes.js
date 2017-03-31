const db = require('../db.js');
const express = require('express');

const router = express.Router();

router.post('/create_team', function(req, res) {
    db.teams.insert({
        team_admin: req.user.id,
        team_name: req.body.team_name,
        team_description: req.body.team_description,
        team_photo: req.body.team_photo,
        privacy: req.body.privacy,
        team_games: req.body.team_games
    }, function(err, team) {
console.log(err);
        db.linkAdminToTeam([
            team.team_id,
            team.team_admin
        ], (err, members) => {
            console.log(err);
        })
        res.status(200).send(team)
    })
})

module.exports = router
