var _swiperComponent = function () {
    var swiper;
    var youtubePlayer;
    var html5VideoPlayer;

    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize Swiper and YouTube Player API
    function initializeSwiper() {
        swiper = new Swiper(".swiper-component", {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 4000, // 3 seconds
                disableOnInteraction: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            on: {
                init: function () {
                   checkSlide();
                },
                slideChange: (swiper) => {
                    const newIndex = swiper.activeIndex;

                    if (newIndex !== swiper.previousIndex) {
                        removeYouTubePlayer();

                        if (html5VideoPlayer) {
                            html5VideoPlayer.pause();
                            html5VideoPlayer.currentTime = 0;
                        }
                    }
                },
                slideChangeTransitionEnd: () => {
                    checkSlide();
                },
            },
        });
    }

    function checkSlide() {
        if ($(".swiper-slide.swiper-slide-active").attr("data-video-type") == "youtube") {
            createYouTubePlayer($(".swiper-slide.swiper-slide-active .youtube-player"));
        }

        if ($(".swiper-slide.swiper-slide-active").attr("data-video-type") == "video") {
            createHTML5Video($(".swiper-slide.swiper-slide-active"));
        }
    }

    // Create a new YouTube player
    function createYouTubePlayer(videoSlide) {
        // Check if the player already exists, remove it if necessary
        console.log("create yt player");

        let el = $(videoSlide)[0];
        let videoId = $(videoSlide).attr("data-video-id");

        // Create the player instance
        youtubePlayer = new YT.Player(el, {
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                autohide: 1,
                mute: 1,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            if (swiper) swiper.autoplay.pause();
        } else if (event.data === YT.PlayerState.ENDED) {
            if (swiper) {
                if (swiper.slides.length == 1) {
                    youtubePlayer.playVideo();
                } else {
                    swiper.slideNext();
                    swiper.autoplay.resume();
                }
            }
        }
    }

    function removeYouTubePlayer() {
        if (youtubePlayer) {
            youtubePlayer.stopVideo(); // Stop the video if it's playing

            // Remove the player element from the DOM and reattached
            $(".swiper-slide.swiper-slide-active .youtube-player").remove();
            $(".swiper-slide.swiper-slide-active .responsive-video-make-height").append(`<div class="responsive-video-canvas youtube-player" data-video-id="${youtubePlayer.options.videoId}"></div>`);

            youtubePlayer = null; // Clear the player reference
        }
    }

    function createHTML5Video(videoSlide) {
        html5VideoPlayer = $(videoSlide).find(".html5-video")[0];

        // Pause Swiper autoplay when an HTML5 video plays
        html5VideoPlayer.addEventListener("play", () => {
            if (swiper) swiper.autoplay.pause();
        });

        // Resume Swiper autoplay when an HTML5 video is paused or ended
        html5VideoPlayer.addEventListener("pause", () => {
            if (swiper) {
                swiper.slideNext();
                swiper.autoplay.resume();
            }
        });
        html5VideoPlayer.addEventListener("ended", () => {
            if (swiper) {
                swiper.slideNext();
                swiper.autoplay.resume();
            }
        });

        html5VideoPlayer.play();
    }


    window.onYouTubeIframeAPIReady = function () {
        console.log("api ready");
        initializeSwiper();
        _responsiveVideo();
    };
};

var _responsiveVideo = function () {
    if ($(".responsive-video-canvas").length && app.windowSize().width > 991) {
        var timeoutId;
        var $responsiveVideoAspect = $(".responsive-video-aspect");
        var $responsiveVideoWidth = $(".responsive-video-width");
        var videoAspect = $responsiveVideoAspect.outerHeight() / $responsiveVideoAspect.outerWidth();

        function responsiveVideoAdopt() {
            windowAspect = $(window).height() / $(".banner-section").width();
            if (windowAspect > videoAspect) {
                $responsiveVideoWidth.width((windowAspect / videoAspect) * 100 + "%");
            } else {
                $responsiveVideoWidth.width(100 + "%");
            }
        }

        $(window).resize(function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(responsiveVideoAdopt, 100);
        });
        $(window).on("orientationchange", function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(responsiveVideoAdopt, 100);
        });
        $(window).scroll(function () {
            responsiveVideoAdopt();
        });
        responsiveVideoAdopt();
    }
};

// Initialize Swiper on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    _swiperComponent();
});
