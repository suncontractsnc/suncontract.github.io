(function() {
    "use strict";
    var _namespaces = ["translation"];
    i18n.init({
            getAsync: false,
            useCookie: true,
            cookieName: "_suncontracttlang",
            lng: "en",
            resGetPath: 'locales/__lng__/__ns__.json',
            fallbackLng: false,
            ns: {
                namespaces: _namespaces
            },
            debug: true
        },
        function() {

        });
})();
var Sun = {
    timer: null,
    countdowndata: new Date(Date.UTC(2017, 05, 28, 16, 35, 0, 0)), //'Jun 28, 2017 8:00:00').getTime(), // end date
    init: function() {
        self = this;
        // Select all links with hashes
        $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                if (
                    location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                    location.hostname === this.hostname
                ) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                    }
                }
            });

        this.startCountdown();
        timer = setInterval(this.getInvestment, 10 * 1000);

        $('.lang').click(function() {
            var lang = $(this).data().lang;
            $('.lang').removeClass('selected');
            $(this).addClass('selected');

            Localization.setLang(lang);
        });
    },
    startCountdown: function() {
        Sun.countdown();
        var x = setInterval(function() {
            Sun.countdown();
        }, 1000);
    },
    countdown: function() {
        // now
        var now = new Date().getTime();

        // diff
        var distance = Sun.countdowndata - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var output = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";

        $('[data-role="days_left"]').text(output)

        // end date reached
        if (distance < 0) {
            clearInterval(x);
            $('[data-role="days_left"]').text("-");
        }
    }
};
var Localization = {

    cookie: "_suncontractlang",
    defaultLang: "en",
    getUserAgentLang: function() {
        var agentLang = navigator.language || navigator.userLanguage;
        var lang = "";
        if (agentLang.split("-")[0]) {
            lang = agentLang.split("-")[0];
        } else {
            lang = this.defaultLang;
        }

        return lang;
    },

    getCookieLang: function() {
        var lang = i18n.lng();
        if (lang.split("-")[0]) {
            lang = lang.split("-")[0];
        } else {
            lang = this.defaultLang;
        }
        return lang;
    },


    setLang: function(newLang) {
        var self = this;
        $('[data-role="flag"]').removeClass("selected_flag");
        if (newLang == "si") {
            $("#blog_href").attr("href", "http://blogslo.suncontract.org")
            $("#flag_si").addClass("selected_flag");
        } else {
            $("#blog_href").attr("href", "http://blog.suncontract.org/")
            $("#flag_en").addClass("selected_flag");
        }
        i18n.setLng(newLang, function(t) {
            $('[data-i18n]').i18n();
        });
    }
};
$(document).ready(function() {
    if (Localization.getCookieLang() === undefined) {
        Localization.setLang(Localization.getUserAgentLang());
    } else {
        Localization.setLang(Localization.getCookieLang());
    }
    $('[data-i18n]').i18n();
    Sun.init();
});