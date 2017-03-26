const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');

const router = express.Router();

// router.get('/', usersCtrl.index);
router.post('/backend/create', usersCtrl.create)
// router.login()

module.exports=router
