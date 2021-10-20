// const layuiAll = require("../assets/lib/layui/layui.all")

$(function() {
    initUserInfo()

    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length < 6 || value.length > 12) {
                return "昵称长度需要在6~12位之间"
            }
        }
    })

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                form.val('formuserinfo', res.data)
            }
        })
    }

    $('#userinfoform').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updateuserinfo',
            method: 'POST',
            data: $('#userinfoform').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新信息失败')
                }
                initUserInfo();
                layui.layer.msg('更新成功')
                window.parent.getUserInfo();
                // window.location.replace('../index.html')
            }
        })
    })

    $('#resetbtn').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    })


})