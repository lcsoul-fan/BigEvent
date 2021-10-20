const express = require('express')
const app = express()

//导入路由
const user = require('./route/user')
const userinfo = require('./route/userinfo')
const article = require('./route/aricle')
const pub_articles = require('./route/pub_articles')

//导入第三方包
const cors = require('cors')
const joi = require('joi')
const jwt = require('express-jwt')
const token = require('./unit/tool')
const analysis = require('./unit/tool')


//用在中间件存放静态资源
app.use(express.static('main'))
app.use('/home', express.static('home'))
app.use('/user', express.static('user'))
app.use('/article', express.static('article'))
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

//使用中间件
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(function(req, res, next) {
    res.cc = function(err, status = 1) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
});


//验证token中间件
app.use(jwt({ secret: token.secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))



//app调用路由
app.use('/api', user)
app.use('/my', userinfo)
app.use('/my', article)
app.use('/my', pub_articles)



app.use(function(err, req, res, next) {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    res.cc(err)
})


app.listen(80, () => console.log('apiserver is runing as 127.0.0.1:80'))