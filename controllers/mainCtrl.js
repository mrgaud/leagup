const db = require('../db');

module.exports = {
    cud: function(req, res) {
        res.status(203).send(req.user)
    },
    oops: function(req, res) {
        res.status(400).send('nope')
    },
    check: function(req, res){
        db.check_new_user([req.body.email,req.body.username],function(err,usr){
            console.log('here');
            console.log(err);
            res.send(usr)
        })
    }
}
