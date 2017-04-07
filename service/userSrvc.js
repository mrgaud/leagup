const db = require('../db');

module.exports = {
    addLike: function(req) {
        db.run(`insert into clients_likes(user_id,poster_id,date)
        values(${req.body.user_id},${req.body.poster_id},${req.body.date})`, (err, likes) => {
            console.log(err);
            return likes
        })
    },
    addDislike: function(req) {
        db.run(`insert into clients_dislikes(user_id,poster_id,date)
        values(${req.body.user_id},${req.body.poster_id},${req.body.date})`, (err, dislikes) => {
            console.log(err);
            return dislikes
        })
    },
    removeLike: function(req) {
        db.run(`delete from clients_likes
            where user_id = ${req.body.user_id} and poster_id = ${req.body.poster_id}
            `, (err, res) => {
            console.log(err)
            return res
        })
    },
    removeDislike: function(req) {
        db.run(`delete from clients_dislikes
            where user_id = ${req.body.user_id} and poster_id = ${req.body.poster_id}
            `, (err, res) => {
            console.log(err)
            return res
        })
    },
    addPasswordRecovery: function(req) {
        db.run(`insert into pw_recovery(user_id, q_one, q_two, q_three, a_one, a_two, a_three)
        values('${req.body.user}', '${req.body.q1}', '${req.body.q2}', '${req.body.q3}', '${req.body.a1}', '${req.body.a2}', '${req.body.a3}')
        `, (err, res) => {
            if (err) {
                console.log(typeof req.body.q1);
                console.log(err);
                return
            }
            db.run(`update clients
                set pw_recovery = 1
                where id=${req.body.user}`)
        })
    }
}
