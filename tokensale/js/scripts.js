
            $( document ).ready(function() {
                    function add_Class(){
                        $("#one").addClass("col-md-6");
                        $("#two").addClass("col-md-2"); 
                        $("#three").addClass("col-md-4");
                        $("#five").addClass("col-md-4");
                        $("#six").addClass("col-md-4");
                        $("#seven").addClass("col-md-4");
                        $("#eight").addClass("col-md-4");
                        $("#nine").addClass("col-md-4");
                        $("#ten").addClass("col-md-4");
                        $("#eleven").addClass("col-md-12");
                        $("#twelve").addClass("col-md-5");
                        $("#threeten").addClass("col-md-7");
                        $("#fourteen").addClass("col-md-12");
                        $("#fifthteen").addClass("col-md-5");
                        $("#sixtheen").addClass("col-md-7");
                        $("#20").addClass("col-md-4");
                        $("#21").addClass("col-md-4");
                        $("#22").addClass("col-md-4");
                        $("#23").addClass("col-md-4");
                        $("#24").addClass("col-md-4");
                        $("#25").addClass("col-md-4");
                        $("#26").addClass("col-md-2");
                        $("#26").addClass("col-md-offset-2");
                        $("#27").addClass("col-md-2");
                        $("#28").addClass("col-md-2");
                        $("#29").addClass("col-md-2");

                    }

                    function remove_class(){
                       $("#one").removeClass("col-md-4");
                        $("#two").removeClass("col-md-4");
                        $("#three").removeClass("col-md-4");
                        $("#five").removeClass("col-md-4");
                        $("#six").removeClass("col-md-4");
                        $("#seven").removeClass("col-md-4");
                        $("#eight").removeClass("col-md-4");
                        $("#nine").removeClass("col-md-4");
                        $("#ten").removeClass("col-md-4");
                        $("#eleven").removeClass("col-md-12");
                        $("#twelve").removeClass("col-md-5");
                        $("#threeten").removeClass("col-md-7");
                        $("#fourteen").removeClass("col-md-12");
                        $("#fifthteen").removeClass("col-md-5");
                        $("#sixtheen").removeClass("col-md-7");
                        $("#20").removeClass("col-md-4");
                        $("#21").removeClass("col-md-4");
                        $("#22").removeClass("col-md-4");
                        $("#23").removeClass("col-md-4");
                        $("#24").removeClass("col-md-4");
                        $("#25").removeClass("col-md-4");
                        $("#26").removeClass("col-md-2");
                        $("#26").removeClass("col-md-offset-2");
                        $("#27").removeClass("col-md-2");
                        $("#28").removeClass("col-md-2");
                        $("#29").removeClass("col-md-2");
                    }



                    $('#news_carousel').carousel({
                            pause: true,
                            interval: 9000,
                        });
        
                    if($(window).width() >= 1020 ){
                        add_Class();
                    }
                    else{
                        remove_class();
                    }
                    if (localStorage.getItem("hasShowConsent") === null) {
                        show_consent();

                        $("#allow_cookies_button").click(function () {
                            localStorage.setItem("hasShowConsent", true);
                            facebook_pixel();
                            google_tag();
                            google_ana();
                        });
                    }
                $( window ).resize(function() {
                   if($(window).width() >= 1020 ){
                        add_Class();
                    }
                    else{
                        remove_class();
                    }
                });

                var open = 0;
            $("#menu_open").click(function(){
                if(open == 0){
                    $( "#menu_open" ).removeClass( "menu_mobile_closed" );
                    $( "#menu_open" ).addClass( "menu_mobile_open" );
                    open = 1;
                }
                else{
                    $("#menu_open").removeClass( " menu_mobile_open" );
                    $("#menu_open").addClass( "menu_mobile_closed");
                    open = 0;
                }
            })

                            $( "#dot_one" ).click(function() {
                    remove_active("#dot_two", "#dot_three", "#slide_two", "#slide_three");
                    add_active("#dot_one", "#slide_one");
                });
                $( "#dot_two" ).click(function() {
                    remove_active("#dot_one", "#dot_three", "#slide_one", "#slide_three");
                    add_active("#dot_two", "#slide_two"); 
                });
                $( "#dot_three" ).click(function() {
                    remove_active("#dot_two", "#dot_one", "#slide_two", "#slide_one");
                    add_active("#dot_three", "#slide_three");
                });
            });

        var modal = document.getElementById('myModal');
        var span = document.getElementById("allow_cookies_button");

        function show_consent() {
            $("#myModal").css("display", "block");


            $("#allow_cookies_button").click(function(){
                 $("#myModal").css("display", "none");

            });
        }
        window.onload = function() {
            
        }

            function remove_active(name, name1, name2, name3){
                $(name).removeClass("active");
                $(name1).removeClass("active");
                $(name2).removeClass("active");
                $(name3).removeClass("active");
            }

            function add_active(name, name1){
                $(name).addClass(" carousel-fade active");
                $(name1).addClass(" carousel-fade active");
            }


      // Google Tag Manager 
        function google_tag(){

            (function (w, d, s, l, i) {w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'GTM-PSHCP8J');

        }

        function facebook_pixel(){
            ! function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window,
                document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '228889184291755'); // Insert your pixel ID here.
            fbq('track', 'PageView');
        }

                function google_ana(){
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                ga('create', 'UA-80290754-1', 'auto');
                ga('send', 'pageview'); 
        }

         if (localStorage.getItem("hasShowConsent") != null){
            google_tag();
            facebook_pixel();
            google_ana();
        }
  

