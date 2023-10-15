const express = require('express')
const router = express.Router()
const { addUserInfo } = require('../controllers/userInfo')


router.post('/userinfo', addUserInfo);
router.get('/userinfo', getUserInfo);
router.get('/userinfo/:userId', getUserInfoById);

module.exports = router;