var Index = {
	init: function () {
		$('.custom').click(function () {
			$('.subscribe-us-margin').removeAttr('style');
            $('.join-us-margin').css('display', 'none');
            $('.logo-sign').addClass('logo_mini');
        });
        $('#mc-embedded-subscribe').click(function () {
            $('.jojning_us').addClass('small_screen');
            
        });
	}
}

$(document).ready(function () {
	Index.init();
});