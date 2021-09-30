$(function() {
    $('.goregister').on('click', function() {
        $('.form-login').hide()
        $('.form-register').show()
    })

    $('.gologin').on('click', function() {
        $('.form-login').show()
        $('.form-register').hide()
    })
})