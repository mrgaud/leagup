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
        ],(err,message)=>{
            console.log(err,message)
            return message
        })
    }
}
