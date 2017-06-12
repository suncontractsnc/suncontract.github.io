var Sun = {
    timer: null,
    countdowndata: new Date(Date.UTC(2017, 05, 28, 15, 0, 0, 0)),//'Jun 28, 2017 8:00:00').getTime(), // end date
    init: function () {
        self = this;
        // Select all links with hashes
        $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function (event) {
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
    },
    startCountdown: function () {
        Sun.countdown();
        var x = setInterval(function () {
            Sun.countdown();
        }, 1000);
    },
    countdown: function () {
        // now
        var now = new Date().getTime();

        // diff
        var distance = Sun.countdowndata - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var output = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        $('[data-role="days_left"]').text(output)

        // end date reached
        if (distance < 0) {
            clearInterval(x);
            $('[data-role="days_left"]').text("-");
        }
    }
}
$(document).ready(function () {
    Sun.init();
});