const db = require('../db');

module.exports = {
    addLike: function(req) {
        console.log(req);
        db.clients_likes.insert({
            user_id: req.body.user_id,
            poster_id: req.body.poster_id,
            date: req.body.date
        }, (err, likes) => {
            console.log(err);
            return likes
        })
    },
    addDislike: function(req) {
        db.clients_dislikes.insert({
            user_id: req.body.user_id,
            poster_id: req.body.poster_id,
            date: req.body.date
        }, (err, dislikes)=> {
            console.log(err);
            return dislikes
        })
    },
    removeLike: function(req) {
        console.log('hitting me');
        db.run(`delete from clients_likes
            where user_id = ${req.body.user_id} and poster_id = ${req.body.poster_id}
            `,(err,res)=>{
            console.log(err)
            return res
        })
    },
    removeDislike: function(req){
        db.run(`delete from clients_dislikes
            where user_id = ${req.body.user_id} and poster_id = ${req.body.poster_id}
            `,(err,res)=>{
            console.log(err)
            return res
        })
    }
}
