const db = require('../db');

module.exports = {
    create: function(req, res) {
        db.teams.insert({
            team_admin: req.user.id,
            team_name: req.body.team_name,
            team_description: req.body.team_description,
            team_photo: req.body.team_photo,
            privacy: req.body.privacy,
            team_games: req.body.team_games
        }, function(err, team) {
            db.linkAdminToTeam([
                team.team_id,
                team.team_admin
            ], (err, members) => {
                console.log(err);
            })
            res.status(200).send(team)
        })
    },
    index: function(req, res) {
        db.teams.find({
            team_id: req.params.id
        }, function(err, teams) {
            let team = teams[0]
            db.getTeamsMembers([team.team_id], (err, members)=>{
                members = members.map(x=>{
                    delete x.password
                    return x
                })
                console.log(members);
                team.members = members
                res.status(200).send(team)
            })
        })
    }
}
