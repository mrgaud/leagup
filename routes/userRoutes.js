const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');

const router = express.Router();

router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create)

module.exports=router
