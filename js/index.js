var Sun = {
    browserData: undefined,
    currentProgressValue: -1,
    countdowndata: new Date(Date.UTC(2017, 06, 06, 16, 30, 0, 0)),
    previousDollar: 0,
    previousEth: 0,
    timer: null,
    //countdowndata: new Date(Date.UTC(2017, 05, 28, 16, 30, 0, 0)), //'Jun 28, 2017 8:00:00').getTime(), // end date
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
        var uaParser = new UAParser();
        this.browserData = uaParser.getBrowser();
      

        this.getInvestment();
        timer = setInterval(this.getInvestment, 10 * 1000);
        $('.lang').click(function () {
            var lang = $(this).data().lang;
            $('.lang').removeClass('selected');
            $(this).addClass('selected');

            Localization.setLang(lang);
        });
    },
    setProgress: function(value) {

        $('.rmap__col').toArray().forEach(function(a) { $(a).removeClass('rmap__col--active') });
        $('.stepper-xs .col').toArray().forEach(function(a) { $(a).removeClass('col--active') });

        if (value <= 5000) {
            $('.rmap [data-step="1"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="1"]').addClass('col--active');
        } else if (value <= 10000) {
            $('.rmap [data-step="2"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="2"]').addClass('col--active');
        } else if (value <= 25000) {
            $('.rmap [data-step="3"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="3"]').addClass('col--active');
        } else if (value <= 40000) {
            $('.rmap [data-step="4"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="4"]').addClass('col--active');
        } else if (value <= 60000) {
            $('.rmap [data-step="5"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="5"]').addClass('col--active');
        } else if (value <= 70000) {
            $('.rmap [data-step="6"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="6"]').addClass('col--active');
        } else {
            $('.rmap [data-step="7"]').addClass('rmap__col--active');
            $('.stepper-xs [data-step="7"]').addClass('col--active');
        }
    },
    startCountdown: function () {
        Sun.countdown();
        var x = setInterval(function () {
            Sun.countdown();
        }, 1000);
    },
    countdown: function() {
        var x = setInterval(function() {

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
        }, 1000);
    },
    getInvestment: function() {
        var self = Sun;
        $.ajax({
                type: 'GET',
                url: 'https://api.suncontract.org/api/values'
            })
            .done(function(resp) {
                // rounding down to 2 decimal places
                var dollar = Math.round(resp.dollarPrice * resp.totalETH);
                var eth = Math.round(resp.totalETH);

                $('[data-role="total_investment_dollar"]').text(dollar.toLocaleString());
                $('[data-role="total_investment_eth"]').text(eth.toLocaleString());
                var item = $('[data-role="total_investment_dollar"]');
                item.attr("data-from", self.previousDollar);
                item.attr("data-to", dollar);
                self.updateCountersRound(item);
                self.previousDollar = dollar;

                item = $('[data-role="total_investment_eth"]');
                item.attr("data-from", self.previousEth);
                item.attr("data-to", eth);
                self.updateCountersRound(item);
                self.previousEth = eth;


                self.setProgress(eth);
            })
            .fail(function() {
                $('[data-role="total_investment_dollar"]').text('-');
                $('[data-role="total_investment_eth"]').text('-');
            });
    },
    updateCountersRound: function(item) {
        item.countTo({
            from: parseFloat(item.attr("data-from")),
            to: item.attr("data-to"),
            refreshInterval: 20,
            speed: item.attr("data-speed") || 1000,
            formatter: function(value, options) {
                return Number(Math.round(value)).toLocaleString('en');
            }
        });
    }
}

$(document).ready(function () {
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
        function () {

        });
    if (Localization.getCookieLang() === undefined) {
        Localization.setLang(Localization.getUserAgentLang());
    } else {
        Localization.setLang(Localization.getCookieLang());
    }
    $('[data-i18n]').i18n();
    Sun.init();
});

var Localization = {

    cookie: "_suncontractlang",
    defaultLang: "en",
    getUserAgentLang: function () {
        var agentLang = navigator.language || navigator.userLanguage;
        var lang = "";
        if (agentLang.split("-")[0]) {
            lang = agentLang.split("-")[0];
        } else {
            lang = this.defaultLang;
        }

        return lang;
    },

    getCookieLang: function () {
        var lang = i18n.lng();
        if (lang.split("-")[0]) {
            lang = lang.split("-")[0];
        } else {
            lang = this.defaultLang;
        }
        return lang;
    },


    setLang: function (newLang) {
        var self = this;
        $('[data-role="flag"]').removeClass("selected_flag");
        if (newLang == "si") {
            $("#blog_href").attr("href", "http://blogslo.suncontract.org")
            $("#flag_si").addClass("selected_flag");
        } else {
            $("#blog_href").attr("href", "http://blog.suncontract.org/")
            $("#flag_en").addClass("selected_flag");
        }
        i18n.setLng(newLang, function (t) {
            $('[data-i18n]').i18n();
        });
    }
};
// ==========
// jQuery Count To
// https://github.com/mhuggins/jquery-countTo
// ==========
! function(t) {
    function e(t, e) { return t.toFixed(e.decimals) }
    var o = function(e, i) { this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, this.dataOptions(), i), this.init() };
    o.DEFAULTS = { from: 0, to: 0, speed: 1e3, refreshInterval: 100, decimals: 0, formatter: e, onUpdate: null, onComplete: null }, o.prototype.init = function() { this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops }, o.prototype.dataOptions = function() {
        var t = { from: this.$element.data("from"), to: this.$element.data("to"), speed: this.$element.data("speed"), refreshInterval: this.$element.data("refresh-interval"), decimals: this.$element.data("decimals") },
            e = Object.keys(t);
        for (var o in e) { var i = e[o]; "undefined" === typeof t[i] && delete t[i] }
        return t
    }, o.prototype.update = function() { this.value += this.increment, this.loopCount++, this.render(), "function" === typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" === typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value)) }, o.prototype.render = function() {
        var t = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(t)
    }, o.prototype.restart = function() { this.stop(), this.init(), this.start() }, o.prototype.start = function() { this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval) }, o.prototype.stop = function() { this.interval && clearInterval(this.interval) }, o.prototype.toggle = function() { this.interval ? this.stop() : this.start() }, t.fn.countTo = function(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("countTo"),
                s = !n || "object" === typeof e,
                r = "object" === typeof e ? e : {},
                a = "string" === typeof e ? e : "start";
            s && (n && n.stop(), i.data("countTo", n = new o(this, r))), n[a].call(n)
        })
    }
}(jQuery);