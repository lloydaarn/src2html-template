var mainApp = {
    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    $root: $("body, html"),
    $body: $("body"),
}

// scroll to top button
var _scrollTopBtn = function() {
    var scrollTopBtnFlag = true;
    var $scrollTopBtn = $(".scroll-top-btn");

    $scrollTopBtn.click(function() {
        mainApp.$root.animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    $(window).scroll(function() {
        // reveal scroll top button
        if ($(this).scrollTop() > 500) {
            if (scrollTopBtnFlag) {
                $scrollTopBtn.addClass("reveal-btn");
                scrollTopBtnFlag = false;
            }
        } else {
            if (!scrollTopBtnFlag) {
                $scrollTopBtn.removeClass("reveal-btn");
                scrollTopBtnFlag = true;
            }
        }

        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $scrollTopBtn.removeClass("reveal-btn");
            scrollTopBtnFlag = true;
        }

    });
}

// reveal-on-scroll
var _revealOnScroll = function() {
    var $window = $(window);
    var viewportHeight = $(window).innerHeight();
    var revealView = (viewportHeight * .70);

    $(window).scroll(function() {

        var scrolledTop = $window.scrollTop();

        $(".reveal-on-scroll:not(.animated)").each(function() {
            var $this = $(this);
            var offsetTop = $this.offset().top;

            if (scrolledTop > offsetTop - revealView) {
                $this.addClass('animated ' + $this.data('animation'));
            }
        });
    });

    $("[data-animation-duration]").each(function(index) {
        var $this = $(this);
        var animDuration = $this.data("animation-duration");
        $this.css({
            '-webkit-animation-duration': animDuration + "s",
            "animation-duration": animDuration + "s"
        })
    });

    $("[data-animation-delay]").each(function(index) {
        var $this = $(this);
        var animDelay = $this.data("animation-delay");
        $this.css({
            '-webkit-animation-delay': animDelay + "s",
            "animation-delay": animDelay + "s"
        })
    });
}

$(document).ready(function() {
    _revealOnScroll();
    _scrollTopBtn();

    $(window).resize(function () {
        if ($(this).width() != mainApp.windowWidth) {
            mainApp.windowWidth = $(this).width();
        }
    });
    $(window).on("orientationchange", function() {
        mainApp.windowWidth = $(window).width();
    });
});