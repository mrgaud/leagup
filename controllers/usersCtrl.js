const db = require('../db');
const bcrypt = require('bcryptjs');

function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}

module.exports = {
    index: function(req, res) {
        req.body.allUsers = db.getAllUsers(function(err, users){
            res.status(200).send(users)
        })
    },
    create: (req, res, next) => {
        // console.log(req.body.name);
        const userInfo = [
            req.body.username,
            req.body.email.toLowerCase(),
            hash(req.body.password)
        ]
        db.createUser(userInfo, function(err, users) {
            if (err) {
                return next(err)
            }
            const data = users[0];
            delete data.password
            res.status(200).json(data);
        });
    }
}
