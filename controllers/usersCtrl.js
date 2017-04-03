const db = require('../db');
const bcrypt = require('bcryptjs');
const userSrvc = require('../service/userSrvc.js');

function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}

module.exports = {
    index: function() {
        return userSrvc.index()
    },
    create: (req, res, next) => {
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
            if (!users.length) {
                console.log('nope');
                return res.status(402).send('nope')
            }
            delete data.password
            db.createProfile([data.id], function(err, profile) {
                console.log(err, profile);
                res.status(200).json(data);
            })
        });
    },
    getUser: function(req, res) {
        delete req.user.password
        res.send(req.user)
    },
    getUserMessages: function(req, res) {
        db.getUserMessages([req.user.id], function(err, messages) {
            res.status(200).send(messages)
        })
    },
    createUserMessage: function(req, res) {
        db.createMessage([req.body.user_id, req.body.poster_id, req.body.poster_username, req.body.date, req.body.message, req.body.poster_image], function(err, message) {
            console.log(err);
            res.status(200).json(message)
        })
    },
    getProfile: function(req, res) {
        db.getProfileByUsername([req.params.username], function(err, profile) {
            profile = profile[0]
            if(!profile) return
            db.getUserMessages([profile.id], function(err, message) {
                profile.messages = message;
                db.getUserLikes([profile.id], function(err, likes) {
                    profile.likes = likes;
                    db.getUserDislikes([profile.id], function(err, dislikes) {
                        profile.dislikes = dislikes
                        db.getUserTeams([profile.id], function(err, teams) {
                            profile.teams = teams
                            console.log(err);
                            res.send(profile)

                        })
                    })
                })
            })
        })
    },
    editProfile: function(req, res) {
        req.body.games = JSON.stringify(req.body.games);
        db.editProfile([req.user.id, req.body.description, req.body.games, req.body.image], function(err, profile) {
            console.log(err,'################',profile);
        })
    },
    addLike: function(req, res) {
        res.send(userSrvc.addLike(req))
    },
    addDislike: function(req, res) {
        res.send(userSrvc.addDislike(req))
    },
    removeLike: function(req, res) {
        res.send(userSrvc.removeLike(req))
    },
    removeDislike: function(req,res){
        res.send(userSrvc.removeDislike(req))
    }
}
