$(function() {
    var form = layui.form;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码格式有误'],
        // oldpwd: function (value) {

        //  }
        checkpwd: function(value) {
            if (value !== $('#newpwd').val()) {
                return "两次密码输入不一致";
            }
        }

    })

    $('#pwdform').on('submit', function(e) {
        e.preventDefault();
        resetPwd();
    })

    function resetPwd() {
        var oldpwd = $('#oldpwd').val();
        var newpwd = $('#newpwd').val();
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: { 'oldPwd': oldpwd, 'newPwd': newpwd },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                return layui.layer.msg(res.message)

            }

        })
    }
})