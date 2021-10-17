const express = require('express')
const router = express.Router()
const userinfo = require('../route_handle/userinfo')
const expressJoi = require('@escook/express-joi')

router.get('/userinfo', userinfo.getUserinfo)
router.post('/updateuserinfo', userinfo.updateUserinfo)
router.post('/updatepwd', userinfo.updatepwd)
router.post('/update/avatar', userinfo.updateAvatar)

module.exports = router