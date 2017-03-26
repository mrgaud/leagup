const express = require('express');
const mainCtrl = require('../controllers/mainCtrl');
const router = express.Router();
const passport = require('../passport');

router.post('/login', passport.authenticate('local',{
    successRedirect:'/currentUserData',
    failureRedirect:'/oops'
}))

module.exports = router;
