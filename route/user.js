const express = require('express');
const router = express.Router();
const { user_schema } = require('../schema/user')
const joi = require('joi')
const expressJoi = require('@escook/express-joi')
const user_handle = require('../route_handle/user')


router.post('/register', expressJoi(user_schema), user_handle.regUser)
router.post('/login', expressJoi(user_schema), user_handle.loginUser)

module.exports = router