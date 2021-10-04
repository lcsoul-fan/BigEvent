// const { template } = require("../../lib/template-web");

$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArticleInfo()
        // 添加分类
    $('#addbtn').on('click', function() {
        layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#addcontent').html(),
            area: ['500px', '300px']
        });
    })
    $(document).on('submit', '.addform', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $('.addform').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArticleInfo()
                layer.closeAll('page');

            }
        })

    })
    var indexedit
        // 修改分类
    $('tbody').on('click', '#modify', function() {
        indexedit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#updatecontent').html(),
            area: ['500px', '300px'],
        });
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('editform',
                    res.data)
            }
        })
    })

    $(document).on('submit', '.updateform', function(e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/updatecate",
            method: 'POST',
            data: $(".updateform").serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArticleInfo()
            }
        })
    })

    // 删除分类
    var indexdel = null
    $('tbody').on('click', '#del', function(e) {
        var id = $(this).attr('data-id')
        indexdel = layer.open({
            title: '删除分类',
            content: '确认删除？',
            yes: function() {
                console.log(id);
                $.ajax({
                    url: '/my/article/deletecate/' + id,
                    method: 'GET',
                    success: function(res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        layer.msg(res.message)
                        initArticleInfo();
                    }
                })
            }
        })
    })



})

function initArticleInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            var str = template('tbl-article', res);
            $('tbody').html(str)
        }
    })
}