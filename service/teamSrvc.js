const db = require('../db');
const massive = require('massive');
console.log(db.teams_clients);
module.exports = {
    join: function(req) {
        db.run(`insert into teams_clients(team_id,user_id) values(${req.body.team_id},${req.body.user_id})`, (err, team) => {
            console.log(err, team);
        })
    },
    leave: function(req) {
        db.run(`delete from teams_clients where user_id=${req.body.user_id} and team_id = ${req.body.team_id}`, (err, team) => {
            console.log(err, team);
            return team
        })
    },
    createMessage: function(req) {
        db.createTeamsMessage([
            req.body.team_id,
            req.body.poster_id,
            req.body.poster_username,
            req.body.message,
            Date.now()
        ], (err, message) => {
            console.log(err, message)
            return message
        })
    },
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    addLike: function(req) {
        db.run(`insert into teams_likes(team_id,user_id,date)
        values(${req.body.team_id},${req.body.user_id},${req.body.date})`, (err, likes) => {
            console.log(err, likes);
            return likes
        })
    },
    addDislike: function(req) {
        db.run(`insert into teams_dislikes(team_id,user_id,date)
        values(${req.body.team_id},${req.body.user_id},${req.body.date})`, (err, dislikes) => {
            console.log(err,'addlikeerror', dislikes);
            return dislikes
        })
    },
    removeLike:function(req){
        db.run(`delete from teams_likes where team_id = ${req.body.team_id} and user_id = ${req.body.user_id} returning *`,(err,likes)=>{
            console.log(err,likes);
            return likes
        })
    },
    removeDislike:function(req){
        db.run(`delete from teams_dislikes where team_id = ${req.body.team_id} and user_id = ${req.body.user_id} returning *`,(err,dislikes)=>{
            console.log(err,dislikes);
            return dislikes
        })
    },
    edit_team:function(req){
        db.editTeam([
            req.body.user_id,
            req.body.team_id,
            req.body.team_description,
            req.body.team_games,
            req.body.team_photo,
            req.body.privacy
        ],(err,team)=>{
            console.log(err,team);
        })
    },
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    teamInvite: function(req){
        db.run(`insert into pending_team_invites(invited,inviter,team)
        select ${req.body.invited},${req.body.inviter},${req.body.team}
        where not exists (select * from pending_team_invites where invited = ${req.body.invited} and team = ${req.body.team})
        `,(err, request)=>{
            console.log(err,request);
        })
    },
    acceptTeamInvite:function(req){
        db.run(`delete from pending_team_invites where invited = ${req.body.invited} and team = ${req.body.team}`)
        db.run(`insert into teams_clients (team_id,user_id)
        select ${req.body.team},${req.body.invited}
            where not exists (select * from teams_clients where user_id = ${req.body.invited} and team_id = ${req.body.team})
        `,(err,teams)=>console.log(err,teams))
    },
    declineTeamInvite:function(req){
        db.run(`delete from pending_team_invites where invited = ${req.body.invited} and team = ${req.body.team}`)
    }
}
