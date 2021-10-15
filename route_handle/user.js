const db = require('../db/db')



function regUser(req, res) {
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名密码不能为空' })
    }

    const sqlstr = 'select * from userinfo where username = ?'
    db.query(sqlstr, userinfo.username, (err, results) => {
        if (err) {
            return console.log(err.message);
        }
        if (results) {
            return res.send({ status: 1, message: '用户名已存在' })
        }
    })


}