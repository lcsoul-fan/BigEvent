// const layuiAll = require("../lib/layui/layui.all")

$(function() {
    $('.goregister').on('click', function() {
        $('.form-login').hide()
        $('.form-register').show()
    })

    $('.gologin').on('click', function() {
        $('.form-login').show()
        $('.form-register').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, "密码长度需要位6-12位"],
            repwd: function(value) {
                var pwd_val = $('#password').val()
                if (value !== pwd_val) {
                    return '两次密码输入不一致'
                }
            }

        })
        // 注册表单提交时间
    $('#form-reg').on('submit', function(e) {
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            data: $(this).serialize(),
            method: 'POST',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.gologin').click();
            }
        })
    })

    // 登录表单提交时间
    $('#form-log').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            data: $(this).serialize(),
            method: 'POST',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var token = res.token
                sessionStorage.setItem('token', token);
                layer.msg(res.message)
                console.log(token);

                // location.href = 'index.html'
            }
        })
    })



})