const db = require('../db');
const teamSrvc = require('../service/teamSrvc.js');
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
            if(err)return err
            db.getTeamsMembers([team.team_id], (err, members) => {
                members = members.map(x => {
                    delete x.password
                    return x
                })
                team.members = members
                db.getTeamsLikes([req.params.id],(err,likes)=>{
                    team.likes = likes
                    db.getTeamsDislikes([req.params.id],(err,dislikes)=>{
                        team.dislikes = dislikes
                        db.getTeamsMessages([req.params.id],(err,messages)=>{
                            team.messages = messages
                            res.status(200).send(team)
                        })
                    })
                })
            })
        })
    },
    join: function(req, res) {
        res.send(teamSrvc.join(req))
    },
    leave: function(req,res){
        res.send(teamSrvc.leave(req))
    },
    createMessage: function(req,res){
        res.send(teamSrvc.createMessage(req))
    },
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    addLike:function(req,res){
        res.send(teamSrvc.addLike(req))
    },
    addDislike:function(req,res){
        res.send(teamSrvc.addDislike(req))
    },
    removeLike:function(req,res){
        console.log('made it here');
        res.send(teamSrvc.removeLike(req))
    },
    removeDislike:function(req,res){
        console.log('made it here too');
        res.send(teamSrvc.removeDislike(req))
    },
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    edit_team:function(req,res){
        console.log('here i am');
        res.send(teamSrvc.edit_team(req))
    },
    teamInvite:function(req,res){
        console.log('teamInvite function log');
        teamSrvc.teamInvite(req)
    },
    kickFromTeam:function(req,res){
        console.log('hitting me');
        teamSrvc.kickFromTeam(req)
    },
    acceptTeamInvite:function(req,res){
        teamSrvc.acceptTeamInvite(req)
    },
    declineTeamInvite:function(req,res){
        teamSrvc.declineTeamInvite(req)
    }
}
