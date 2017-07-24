var snc_to_eth = 0;
var eth_value = 0;
var snc_value = 0;
(function ($) {
  "use strict";

  function resetTransitionDelay(selection, maxDelay, direction) {

    var startY = selection.min(function () {
      return $(this).offset().top;
    });

    var endY = selection.max(function () {
      return $(this).offset().top;
    });

    console.log("Interpolating delay ", maxDelay, " between ", startY, " and ", endY);

    selection.each(function () {
      var weight = ($(this).offset().top - startY) / (endY - startY);
      var delay = maxDelay * ((direction > 0) ? weight : (1 - weight));
      $(this).css("transition-delay", delay + "s");
    });

  }

  /**
   * Do form coming in and coming out animations.
   *
   * @param selector CSS selector to map out elements needed to be animated
   */
  function doAnimation(selector) {

    var body = $(window.document.body);
    var animated = $(selector);

    // Not any animated elements present
    if (!animated.length) {
      return;
    }

    // Initialize animated element states
    body.addClass("page-in");
    animated.addClass("animated");

    // Override initial visibility hack
    // resetTransitionDelay(animated, 0.3, +1);

    $(window).on("load", function () {
      body.addClass("page-loaded");
    });

  }

  function changeActiveTab(newTab) {
      $("#invest-wizard a").each(function (index) {
          if ($(this).is($(newTab))) {
              $(this).parent().prop("class", "active");
              $(this).removeAttr("disabled");

              var tabID = $(this).data("tab-content");
              $(tabID).show();

              if (tabID.indexOf('terms') >= 0) {
                    $('body').removeClass('email');
                    $('body').addClass('terms');
              } else if (tabID.indexOf('email') >= 0) {
                    $('body').removeClass('terms');
                    $('body').addClass('email');
              }

              var tabTitle = $(this).data("tab-title");
              $(tabTitle).show();
          } else {
              $(this).parent().prop("class", "");
              //$(this).prop("disabled", true);

              var tabID = $(this).data("tab-content");
              $(tabID).hide();

              var tabTitle = $(this).data("tab-title");
              $(tabTitle).hide();
          }
      });
  }

  function validateCheckboxes() {
    if ($("#accept").is(":checked")) {
        $("#btn-next").prop("disabled", false);
        $("#btn-next").removeAttr("disabled");
    } else {
        $("#btn-next").attr('disabled', 'disabled');
    }
  }

  $(document).ready(function () {
     
      doAnimation(".modal-body");

      $("#navigation_terms").on("click", function () {
          if (! this.hasAttribute("disabled")) {
              changeActiveTab("#navigation_terms");
          }
      });
      $("#navigation_contribution").on("click", function () {
          if (!this.hasAttribute("disabled") && $("#accept").prop("checked")) {
              changeActiveTab("#navigation_contribution");
          }
      });

      $("#navigation_email").on("click", function () {
          if (!this.hasAttribute("disabled") && $("#accept").prop("checked")) {
              changeActiveTab("#navigation_email");
              dataLayer.push({
                  "event": "transaction",
                  "ecommerce": {
                      "purchase": {
                          "actionField": {
                              "id": Math.random().toString(),
                              "affiliation": "suncontract.org",
                              "revenue": snc_value,
                              "tax": 0,
                              "shipping": 0
                          },
                          "products": [{
                              "id": "ETH",
                              "name": "ETH",
                              "price": eth_value,
                              "quantity": 1
                          }]
                      }
                  }
              });
          }
      });

      $(".step-buttons").on("click", function () {
          if (!this.hasAttribute("disabled")) {
              $($(this).data("navigation-target")).removeAttr("disabled");
              $($(this).data("navigation-target"))[0].click();
          }
      });

      $("#accept").click(function () {
          validateCheckboxes();
      });
      $("#contribution_value").keyup(function () {
          if (isNaN($(this).val()) === false) {
              $("#snc_to_receive").text($(this).val() * snc_to_eth);
              $("#btn-next-to-email").prop("disabled", false);
              $("#btn-next-to-email").removeAttr("disabled");
              $('[data-role="show-conversion"]').show();
              snc_value = $(this).val() * snc_to_eth;
              eth_value = $(this).val();
              
          }
          else {
              $("#btn-next-to-email").attr('disabled', 'disabled');
              $('[data-role="show-conversion"]').hide();
          }
      });
      $('[data-role="show-conversion"]').hide();
      $.ajax({
          type: 'GET',
          url: 'https://api.suncontract.org/api/values'
      }).done(function (resp) {
          snc_to_eth = resp.sncEthConversion; 
          });
  });

})(jQuery);