const express = require('express');
const mainCtrl = require('../controllers/mainCtrl');
const router = express.Router();
const passport = require('../passport');

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log(req.user, 'here i am');
    delete req.user.password
    delete req.user.id
    res.send(req.user).redirect('/stuff')
})


router.get('/auth/currentUserData', mainCtrl.cud)

router.get('/oops', mainCtrl.oops)

module.exports = router;
