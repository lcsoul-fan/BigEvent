const db = require('../db/db')
const analysis = require('../unit/tool')
const bcryptjs = require('bcryptjs')

function getUserinfo(req, res) {
    const id = req.user.id
    const getUserinfo = 'select * from userinfo where id=?';
    db.query(getUserinfo, [id], (err, results) => {
        if (err) {
            return res.cc(1)
        }
        res.send({
            status: 0,
            message: '获取用户数据成功',
            data: results[0]
        })
    })
}

function updateUserinfo(req, res) {
    const updateinfo = req.body;
    console.log(updateinfo);
    const sqlStr = 'update userinfo set nickname=? ,email=? where id =? ';
    db.query(sqlStr, [updateinfo.nickname, updateinfo.email, updateinfo.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        console.log(results);
        if (results.affectedRows !== 1) {
            return res.cc('更新失败')
        }
        return res.cc('信息更新成功', 0)
    })
}

function updatepwd(req, res) {
    // const authorization = req.get('authorization').split(' ')[1]
    // console.log(req.user);
    const passpwd = req.body;
    // const userinfo = analysis.analysisToken(authorization)
    const id = req.user.id
    if (!id) {
        return res.cc('用户不存在')
    }
    const sqlStr = 'select * from userinfo where id = ?'
    db.query(sqlStr, [id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length <= 0) {
            return res.cc('用户不存在')
        }
        if (passpwd.oldPwd == passpwd.newPwd) {
            return res.cc('新密码不能和原密码一样')
        }
        if (!bcryptjs.compareSync(passpwd.oldPwd, results[0].password)) {
            return res.cc('原密码有误')
        }
        const updatepwdStr = 'update userinfo set password = ?where id = ?'
        passpwd.newPwd = bcryptjs.hashSync(passpwd.newPwd, 10)
        db.query(updatepwdStr, [passpwd.newPwd, id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc(err)
            }
            return res.cc('密码重置成功')
        })
    })
}

function updateAvatar(req, res) {
    const id = req.user.id
    const avatar = req.body;
    console.log(avatar);
    if (!id) {
        return res.cc('用户不存在')
    }
    const sqlStr = 'update userinfo set user_pic = ? where id =?'
    db.query(sqlStr, [avatar.avatar, id], (err, results) => {
        console.log(results);
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc(err)
        }
        res.cc('头像更新成功', 0)
    })
}

module.exports = {
    getUserinfo,
    updateUserinfo,
    updatepwd,
    updateAvatar
}