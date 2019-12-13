// browser update
var $buoop = {
    required: {
        e: 16,
        f: 58,
        o: 51,
        o_a: 45,
        s: -2,
        c: "67.0.3396.12",
        y: 18.1,
        v: "1.10",
        uc: 11.5,
        samsung: 7.0
    },
    insecure: true,
    api: 2019.01,
    reminder: 0,
};

var _windowSize = function () {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}


// scroll to top button
var _scrollTopBtn = function () {
    var scrollTopBtnFlag = true;
    var $scrollTopBtn = $('.scroll-top-btn');
    var $root = $('body, html');

    $scrollTopBtn.click(function () {
        $root.animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    $(window).scroll(function () {
        // reveal scroll top button
        if ($(this).scrollTop() > 500) {
            if (scrollTopBtnFlag) {
                $scrollTopBtn.addClass('reveal-btn');
                scrollTopBtnFlag = false;
            }
        } else {
            if (!scrollTopBtnFlag) {
                $scrollTopBtn.removeClass('reveal-btn');
                scrollTopBtnFlag = true;
            }
        }

        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $scrollTopBtn.removeClass('reveal-btn');
            scrollTopBtnFlag = true;
        }
    });
}


$(document).ready(function () {
    _scrollTopBtn();
});