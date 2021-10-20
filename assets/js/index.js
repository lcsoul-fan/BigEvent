// const layuiAll = require("../lib/layui/layui.all")

$(function() {
    getUserInfo()
    var layer = layui.layer
    $('#logout').on('click', function() {
        layer.confirm('确认退出吗？', { icon: 3, title: '提示' }, function(index) {
            //do something
            sessionStorage.removeItem('token');
            location.href = "login.html"
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: { 'Authorization': sessionStorage.getItem('token') || "" },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderUserInfo(res.data)
        }

    })
}

function renderUserInfo(userinfo) {
    var username = userinfo.nickname || userinfo.username;
    console.log(username);
    $('.welcome').html('欢迎&nbsp;&nbsp;' + username)
    if (userinfo.user_pic !== null) {
        $('.layui-nav-img').attr('src', userinfo.user_pic);
        $('.avatar-default').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.avatar-default').html(username[0].toUpperCase()).show();
    }
}