const joi = require('joi')
const username = joi.string().alphanum().min(6).max(10).required();
const password = joi.string().pattern(/^(\S){6,12}/).required();
const email = joi.string().pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
const nickname = joi.string()
const id = joi.required()
const avatar = joi.string().dataUri().required()

module.exports.user_schema = {
    body: {
        username,
        password,
    }
}

module.exports.userinfo_schema = {
    body: {
        email,
        nickname,
        id
    }
}

module.exports.avatar_schema = {
    avatar
}