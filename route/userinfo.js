const express = require('express')
const router = express.Router()
const userinfo = require('../route_handle/userinfo')
const expressJoi = require('@escook/express-joi')
const { userinfo_schema } = require('../schema/user')
const { avatar } = require('../schema/user')

router.get('/userinfo', userinfo.getUserinfo)
router.post('/updateuserinfo', expressJoi(userinfo_schema), userinfo.updateUserinfo)
router.post('/updatepwd', userinfo.updatepwd)
router.post('/update/avatar', expressJoi(avatar), userinfo.updateAvatar)

module.exports = router