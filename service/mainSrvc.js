const db = require('../db');

module.exports = {
    search: function(req) {
        db.run(`select * from clients
            full outer join clients_info
            on clients.id = clients_info.user_id
             where lower(username) like lower('%${req.params.terms}%')`, (err, users) => {
            users.map(x => {
                delete x.password
                return x
            })
            db.run(`select * from teams
                where lower(team_name) like lower('%${req.params.terms}%')`, (err, teams) => {
                console.log(users,teams);
                return {users:users,teams:teams}
            })
        })
    }
}
