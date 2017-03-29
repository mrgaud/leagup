const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');
const logout = require('express-passport-logout');

const router = express.Router();

router.post('/create', usersCtrl.create)

router.get('/currentUser',usersCtrl.getUser)

router.get('/getProfile/:username', usersCtrl.getProfile)

router.patch('/edit_profile', usersCtrl.editProfile)

router.post('/userMessages', usersCtrl.createUserMessage)

router.get('/userMessages', usersCtrl.getUserMessages)

router.get('/logout', logout())

module.exports=router
