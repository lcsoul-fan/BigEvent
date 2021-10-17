const joi = require('joi')
const username = joi.string().alphanum().min(6).max(10).required();
const password = joi.string().pattern(/^(\S){6,12}/).required();
const email = joi.string().pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

module.exports.user_schema = {
    body: {
        username,
        password,
        email
    }
}