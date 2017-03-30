const db = require('../db');
const bcrypt = require('bcryptjs');

function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}

module.exports = {
    index: function(req, res) {
        req.body.allUsers = db.getAllUsers(function(err, users) {
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
            db.createProfile([data.id],function(err,profile){
                console.log(err,profile);
                res.status(200).json(data);
            })
        });
    },
    getUser: function(req, res) {
        delete req.user.password
        console.log('naughty naughty');
        res.send(req.user)
    },
    getUserMessages: function(req,res){
        db.getUserMessages([req.user.id],function(err, messages){
            res.status(200).send(messages)
        })
    },
    createUserMessage: function(req,res){
        db.createMessage([req.body.user_id,req.body.poster_id,req.body.poster_username,req.body.date,req.body.message,req.body.poster_image],function(err,message){
            console.log(err,message);
            res.status(200).json(message)
        })
    },
    getProfile: function(req,res){
        db.getProfileByUsername([req.params.username],function(err,profile){
            profile = profile[0]
            db.getUserMessages([profile.id],function(err,message){
                profile.messages = message;
                db.getUserLikes([profile.id],function(err,likes){
                    profile.likes = likes;
                    db.getUserDislikes([profile.id],function(err,dislikes){
                        profile.dislikes = dislikes
                        db.getUserTeams([profile.id],function(err,teams){
                            profile.teams = teams
                            console.log(teams);
                            res.send(profile)

                        })
                    })
                })
            })
        })
    },
    editProfile:function(req,res){
        req.body.games = JSON.stringify(req.body.games);
        db.editProfile([req.user.id,req.body.description, req.body.games],function(err,profile){
            console.log(err,profile);
        })
    }
}
