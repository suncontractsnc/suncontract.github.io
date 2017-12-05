var Sun = {
    browserData: undefined,
    currentProgressValue: -1,
    countdowndata: new Date(Date.UTC(2017, 06, 06, 16, 30, 0, 0)),
    countdownend: new Date(Date.UTC(2017, 06, 06, 16, 30, 0, 0)),
    previousDollar: 0,
    previousEth: 0,
    utcTime: 0,
    timer: null,
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
        $('.lang').click(function () {
            var lang = $(this).data().lang;
            $('.lang').removeClass('selected');
            $(this).addClass('selected');

            Localization.setLang(lang);
        });
        var item = $('[data-role="total_investment_snc"]');
        self.updateCountersRound(item);
        item = $('[data-role="total_contributors"]');
        self.updateCountersRound(item);
        item = $('[data-role="total_investment_eth"]');
        self.updateCountersRound(item);
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
        if (newLang === "en") {
            $("#slected_lang").text("EN");
        }
        else if (newLang === "si") {
            $("#slected_lang").text("SLO");
        }
        else if (newLang === "cn") {
            $("#slected_lang").text("中文");
        }
        else if (newLang === "ko") {
            $("#slected_lang").text("KO");
        } else if (newLang === "ru") {
            $("#slected_lang").text("RU");
        } else if (newLang === "jp") {
            $("#slected_lang").text("日本語");
        }
      
        $('[data-role="flag"]').removeClass("selected_flag");
        if (newLang == "si") {
            $("#blog_href").attr("href", "https://medium.com/suncontract")
            $("#flag_si").addClass("selected_flag");
        } else {
            $("#blog_href").attr("href", "https://medium.com/suncontract")
            $("#flag_en").addClass("selected_flag");
        }
        if (newLang === "jp") {
            $('[data-role="whitepaper_href"]').attr("href", "res/whitepaperjp.pdf")
        }
        else if (newLang === "ru") {
            $('[data-role="whitepaper_href"]').attr("href", "res/whitepaperru.pdf")
        }
        else if (newLang === "cn") {
            $('[data-role="whitepaper_href"]').attr("href", "res/whitepaperch.pdf")
        }
        else if (newLang === "ko") {
            $('[data-role="whitepaper_href"]').attr("href", "res/whitepaperkor.pdf")
        }
        else
        {
            $('[data-role="whitepaper_href"]').attr("href", "res/whitepaper.pdf")
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
