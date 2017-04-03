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
    }
}
