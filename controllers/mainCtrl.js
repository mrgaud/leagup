const db = require('../db');
const mainSrvc = require('../service/mainSrvc');
module.exports = {
    search: function(req, res) {
        db.run(`select * from clients
            full outer join clients_info
            on clients.id = clients_info.user_id
             where lower(username) like lower('%${req.params.terms}%')
             limit 20`, (err, users) => {
            console.log(err, users);
            users.map(x => {
                x.games = JSON.parse(x.games)
                delete x.password
                return x
            })
            db.run(`select * from teams
                where lower(team_name) like lower('%${req.params.terms}%') limit 20`, (err, teams) => {
                console.log(users, teams, err);
                teams.map(x => {
                    if (x.games) {
                        x.games = JSON.parse(x.games)
                    }
                    return x
                })
                res.send({
                    users: users,
                    teams: teams
                })
            })
        })
    }
}
