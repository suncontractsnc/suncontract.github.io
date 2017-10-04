var Index = {
    init: function () {
        
        $('.join-us-button').click(function () {
            $('.subscribe-us-position').removeAttr('style');
            $('.join-us-margin').css('display', 'none');
            $('.logo-sign').addClass('logo_mini');
        });
        $('#mc-embedded-subscribe').click(function () {
            $('.jojning_us').addClass('small_screen');
            
        });

        $('#mc-embedded-subscribe-form').submit(function () {
            $.ajax({
                url: $('#mc-embedded-subscribe-form').attr('action'),
                type: 'POST',
                data: $('#mc-embedded-subscribe-form').serialize(),
                success: function (res) {
                    //console.log(res);
                    var string = res;
                    //console.log(string);
                    substring = "To complete the subscription process, please click the link in the email we just sent you.";
                    var r = string.indexOf(substring);
                    if (r != -1) {
                        $("#mce-EMAIL").css("display", "none");
                        $("#icon_place").css("display", "none");
                        $('#mc-embedded-subscribe1').attr("disabled", true);
                    }
                }
            });
            return false;
        });
        $("#mc-embedded-subscribe1").click(function () {
            $('#mce-EMAIL').off('blur');
        });
        window.addEventListener('click', function (e) {
            console.log("jeej");
            var handler_on = true;
            if (document.getElementById('mce-EMAIL').contains(e.target)) {
                if (handler_on == true) { handler_on = false; }
                else {
                    handler_on = true;
                    $('#mce-EMAIL').on('blur');
                }
            } else {

                if (handler_on == true) {
                    $('#mce-EMAIL').off('blur');
                    handler_on = false;
                }
                console.log(handler_on);
            }
        });
        var width = $(window).width();

        if (width < 1024) {
            $("#source").detach().prependTo("#destination");
            $("#source1").detach().prependTo("#destination");
            $("#icon_place").addClass("hide_icon");

        }
        else {
            $("#source").detach().prependTo("#destination2");
            $("#source1").detach().prependTo("#destination2");
            $("#row_one_desktop").removeClass("col-sm-offset-2");
            $("#row_one_desktop").removeClass("col-xs-offset-1");

        }

        //when screen resizes check width and act accordingly
        $(window).on("resize", function () {
            width = $(window).width();
            //console.log(width);
            if (width < 1024) {
                $("#source").detach().prependTo("#destination");
                $("#source1").detach().prependTo("#destination");
                $("#icon_place").addClass("hide_icon");
                $("#row_one_desktop").addClass("col-sm-offset-2");
                $("#row_one_desktop").addClass("col-xs-offset-1");
            }
            else {
                $("#source").detach().prependTo("#destination2");
                $("#source1").detach().prependTo("#destination2");
                $("#row_one_desktop").removeClass("col-sm-offset-2");
                $("#row_one_desktop").removeClass("col-xs-offset-1");
                $("#icon_place").removeClass("hide_icon");
            }
        })

        //on click join_us we get the action based on screen width
        $("#moj").click(function () {
            var screenwidth = $(window).width();
            if (screenwidth < 1024) {
                $("#moj").attr("data-toggle", "modal");
                $("#big_screen_join_us").hide();
                $("#button_all").show();
                screenwidth = 0;
                $('[name="nova_forma"]').attr("id", "mc-embedded-subscribe-form");
            }
            else {
                $('html,body').animate({
                    scrollTop: $("#big_screen_join_us").offset().top
                },
                    1000);
            }
        })

        $("#mc-embedded-close").click(function () {
            $("#moj").removeAttr("data-toggle", "modal");
        })

        $('#mce-EMAIL').blur(function (event) {
            setTimeout(function () { $("#mce-EMAIL").focus(); }, 20);
        });

        $('#mce-EMAIL').click(function () {
            $('#mce-EMAIL').blur(function (event) {
                setTimeout(function () { $("#mce-EMAIL").focus(); }, 20);
            });
        });
        var modal = document.getElementById('myModal');
        var span = document.getElementById("allow_cookies_button");

        function show_consent() {
            console.log("showam consenz");
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";

            }
        }
        if (localStorage.getItem("hasShowConsent") === null) {
            show_consent();
            $("#allow_cookies_button").click(function () {
                localStorage.setItem("hasShowConsent", true);
            });
        }
        else {
            console.log(localStorage.getItem("hasShowConsent"));
        }
	}
}

$(document).ready(function () {
	Index.init();
});