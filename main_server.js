const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('main'))
app.use('/home', express.static('home'))
app.use('/user', express.static('user'))
app.use('/article', express.static('article'))
app.use('/assets', express.static('assets'))











app.listen(80, () => console.log('apiserver is runing as 127.0.0.1:80'))