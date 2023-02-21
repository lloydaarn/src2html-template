var app = {};

app.$root = $("html, body");

app.windowSize = function () {
    var e = window,
        a = "inner";
    if (!("innerWidth" in window)) {
        a = "client";
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + "Width"],
        height: e[a + "Height"],
    };
};

// scroll to top button
var _scrollHelper = function () {
    var scrollTopBtnFlag = true;
    var $scrollTopBtn = $(".scroll-top-btn");

    $scrollTopBtn.click(function () {
        app.$root.animate(
            {
                scrollTop: 0,
            },
            1000
        );
        return false;
    });

    $(window).scroll(function () {
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
};

$(document).ready(function () {
    _scrollHelper();

    // plugins init
    AOS.init({
        once: true,
        duration: 500,
    });
    cssVars();
    objectFitImages();
});
