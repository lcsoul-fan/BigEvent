const db = require('../db/db')
const bcryptjs = require('bcryptjs')
const getToken = require('../unit/tool')

function regUser(req, res) {
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名密码不能为空')
    }
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10)

    const searchSql = 'select * from userinfo where username = ?'
    db.query(searchSql, [userinfo.username], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名已存在')
        }
        const addSql = 'insert into userinfo set?'
        db.query(addSql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('用户注册失败')
            }
            res.cc('用户注册成功', 0)
        })

    })
}

function loginUser(req, res) {
    const userinfo = req.body;
    const searchUser = 'select * from userinfo where username = ?';
    db.query(searchUser, [userinfo.username], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length <= 0) {
            return res.cc('用户不存在')
        }
        if (!bcryptjs.compareSync(userinfo.password, results[0].password)) {
            return res.cc('密码有误')
        }
        console.log(getToken.getToken({ id: results[0].id }));
        return res.send({
            status: 0,
            message: '登录成功',
            token: getToken.getToken({ id: results[0].id })
        })
    })
}




module.exports = {
    regUser,
    loginUser
}