const db = require('../db');

module.exports = {
    addLike: function(req) {
        console.log(req);
        db.clients_likes.insert({
            user_id: req.body.user_id,
            poster_id: req.body.poster_id,
            date: req.body.date
        }, (err, likes) => {
            console.log(err,likes);
            return likes
        })
    }
}
