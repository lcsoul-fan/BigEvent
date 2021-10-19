const db = require("../db/db");

function addAticles(req, res) {
    console.log(req.file);
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('封面必须要上传！')
    }

    const reqData = {
        ...req.body,
        pub_time: new Date(),
        author_id: req.user.id
    }

    const sqlStr = 'insert into pub_article set?'
    db.query(sqlStr, reqData, (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('发布失败')
        }
        res.cc('发布成功', 0)
    })
}

module.exports = {
    addAticles
}