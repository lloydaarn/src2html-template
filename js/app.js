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


$(document).ready(function () {

    // plugins init
    AOS.init({
        once: true,
        duration: 500,
    });
});
