var Index = {
    init: function() {

        $('.join-us-button').click(function() {
            $('.subscribe-us-position').removeAttr('style');
            $('.join-us-margin').css('display', 'none');
            $('.logo-sign').addClass('logo_mini');
        });
        $('#mc-embedded-subscribe').click(function() {
            $('.jojning_us').addClass('small_screen');

        });
    }
}

$(document).ready(function() {
    Index.init();
});