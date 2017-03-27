const express = require('express');
const mainCtrl = require('../controllers/mainCtrl');
const router = express.Router();
const passport = require('../passport');

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    delete req.user.password
    res.send(req.user)
})

module.exports = router;
