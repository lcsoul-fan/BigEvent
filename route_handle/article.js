const db = require('../db/db')


function getArticleCates(req, res) {
    const id = req.query
    console.log(req.query);
    if (!id.id) {
        console.log(1);
        const sqlStr = 'select * from article_cates where is_delete=0'
        db.query(sqlStr, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            return res.send({
                status: 0,
                message: '获取文章分类成功',
                data: results
            })
        })
    } else {
        const sqlStr = 'select * from article_cates where is_delete=0 and id = ?'
        db.query(sqlStr, [id.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            return res.send({
                status: 0,
                message: '获取文章分类成功',
                data: results
            })
        })
    }

}


function addArticleCates(req, res) {
    const articleinfo = req.body
    const sqlStr = 'insert into article_cates set ?'
    db.query(sqlStr, { name: articleinfo.name, alias: articleinfo.alias }, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        console.log(results);
        if (results.affectedRows == 1) {
            return res.cc('新增文章分类成功', 0)
        }
    })
}

function delArticleCates(req, res) {
    const id = req.query
    const sqlStr = 'select * from article_cates where id =?'
    db.query(sqlStr, [id.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length <= 0) {
            return res.cc('分类不存在')
        }
        const delsqlStr = 'update article_cates set is_delete =1 where id = ?'
        db.query(delsqlStr, [id.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            return res.cc('删除成功', 0)
        })
    })
}


function updateCate(req, res) {
    const cateinfo = req.body
    const sqlStr = 'update article_cates set name = ?,alias=? where id =?and is_delete = 0'
    db.query(sqlStr, [cateinfo.name, cateinfo.alias, cateinfo.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        console.log(results);
        if (results.affectedRows !== 1) {
            return res.cc('更新分类信息失败')
        }
        return res.cc('更新分类信息成功', 0)
    })

}


module.exports = {
    getArticleCates,
    addArticleCates,
    delArticleCates,
    updateCate
}