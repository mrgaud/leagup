const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');

const router = express.Router();

router.post('/create', usersCtrl.create)

router.get('/currentUser',usersCtrl.getUser)

module.exports=router
