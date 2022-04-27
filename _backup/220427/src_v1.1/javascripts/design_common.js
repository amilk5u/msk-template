"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;
var _compareBoxW;
var $header = $("#header");
var $alignMonitor = $(".monitor_compare .compare_box, .monitor_compare .lcd_screen .img_wrap");

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    _compareBoxW = $(".monitor_compare .compare_box").width();
    $alignMonitor.css({ "background-position-x": -(1462 - _compareBoxW) / 2 });
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
        _compareBoxW = $(".monitor_compare .compare_box").width();
        $alignMonitor.css({ "background-position-x": -(1462 - _compareBoxW) / 2 });
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });
    main();
    layout();
    scrollEvent();
});

function layout() {
    var $allNav = $("#allNav");
    var $gnbNav = $allNav.find("nav");
    var $allMenuBtn = $("#allMenuBtn");
    var $navDimmed = $("#navDimmed");

    //nav btn open
    $allMenuBtn.click(function () {
        var _this = $(this);
        if (!$allNav.hasClass("nav_open")) {
            $html.addClass("no_scroll");
            $allNav.addClass("nav_open");
            TweenMax.to($navDimmed, .3, { display: "block", opacity: .6 });
            TweenMax.to($gnbNav, .3, { x: "0%", ease: esStep });
        } else {
            allNavClose();
        }
    });
    $navDimmed.click(function () {
        allNavClose();
    });
    function allNavClose() {
        $html.removeClass("no_scroll");
        $allNav.removeClass("nav_open");
        TweenMax.to($navDimmed, .3, { display: "none", opacity: 0 });
        TweenMax.to($gnbNav, .3, { x: "-100%", ease: esStep });
    }
}

function main() {
    var $header = $("header"),
        $top_btn = $header.find(".top_btn");
    var $mainVisual = $("#mainVisual");
    var $fullpage = $("#fullpage");
    var $Menu = $("#myMenu"),
        $MenuLi = $Menu.find("li");

    $top_btn.on("click", function () {
        $(this).fadeOut();
    });

    //view
    function ver2View() {
        if (winW >= 1440 && ($fullpage.hasClass("ver2"))) {
            $mainVisual.removeClass("section");
        } else if (winW <= 1440 && ($fullpage.hasClass("con_ver2"))) {
            $mainVisual.addClass("section");
        } else {
        }
    }
    ver2View();

    // fullpage
    /* $fullpage.fullpage({
        autoScrolling: true,
        scrollingSpeed: 800,
        scrollHorizontally: true,
        scrollOverflow: true, // 스크롤생기게
        normalScrollElements: '.scrollable-content',
        anchors:['main', 'video', 'warehouse', 'principles', 'effect', 'story1', 'story2' , 'campaign', 'footer'],
        menu: '#myMenu',
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;
            $MenuLi.removeClass("active half back_gray half_2 half_3 half_5 half_6 half_7");
            //의료지원
            if( destination === 1 ){
                $MenuLi.eq(0).addClass("back_gray");
                $MenuLi.eq(0).addClass("half_2");
            }
            else if ( destination === 2 ){
                $MenuLi.eq(0).addClass("back_gray");
                $MenuLi.eq(0).addClass("half_5");
            }else if ( destination === 3 ){
                $MenuLi.eq(0).addClass("back_gray");
                $MenuLi.eq(0).addClass("half_7");
            }else if ( destination === 4 ){
                $MenuLi.eq(0).addClass("back_gray");
                $MenuLi.eq(0).addClass("half");
            }

            //후원이야기1
            else if ( destination === 8 ) {
                $MenuLi.eq(7).addClass("back_gray");
                $MenuLi.eq(7).addClass("half_5");
            }
            //후원이야기2
            else if( destination === 9 ){
                $MenuLi.eq(7).addClass("back_gray");
                $MenuLi.eq(7).addClass("half");
            }
            // footer
            if( destination === 10 ){
                $MenuLi.eq(9).addClass("half");
            }
            if( destination === 11 ){
                $MenuLi.eq(9).addClass("half");
            }

            //카운터효과
            if( destination === 7 ){
                counter();
            }
            if (origin === 1) {
                $top_btn.fadeIn();
            } else if (origin === 2 && direction === 'up') {
                $top_btn.fadeOut();
            }
        },
    }); */

    var $btn_play1 = $mainVisual.find(".btn_play"),
        $play1 = $btn_play1.find(".play"),
        $stop1 = $btn_play1.find(".stop");

    var $maintype1 = $mainVisual.find(".container.type1"),
        $maintype2 = $mainVisual.find(".container.type2");

    //visual_slide
    var swiper_visual = new Swiper('.swiper-container.visual_slide', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 1200,
        autoplay: true
    });
    $stop1.on("click", function () {
        $(this).removeClass("active");
        $play1.addClass("active");
        /* type1과 type2 에 type_1 이 포함 되어 있을때와 없을때  */
        if ($maintype1.hasClass("type_1") && $maintype2.hasClass("type_1")) {
            swiper_visual[0].autoplay.stop();
            swiper_visual[1].autoplay.stop();
        } else {
            swiper_visual.autoplay.stop();
        }
    });
    $play1.on("click", function () {
        $(this).removeClass("active");
        $stop1.addClass("active");
        if ($maintype1.hasClass("type_1") && $maintype2.hasClass("type_1")) {
            swiper_visual[0].autoplay.start();
            swiper_visual[1].autoplay.start();
        } else {
            swiper_visual.autoplay.start();
        }
    });
    var $videoInfo = $("#videoInfo"),
        $btn_play2 = $videoInfo.find(".btn_play"),
        $play2 = $btn_play2.find(".play"),
        $stop2 = $btn_play2.find(".stop");

    // section 2 slide
    var swiper_video = new Swiper('.swiper-container.video_slide', {
        autoplay: true,
        speed: 1200,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
    $stop2.on("click", function () {
        $(this).removeClass("active");
        $play2.addClass("active");
        swiper_video.autoplay.stop();
    });
    $play2.on("click", function () {
        $(this).removeClass("active");
        $stop2.addClass("active");
        swiper_video.autoplay.start();
    });

    // section 3 slide 1
    var $speed = 800;

    var $item_box = $(".item_box"),
        $item_length = $item_box.find(".length"),
        $item_counter = $item_box.find(".counter");

    var $count = 5;

    if ((winW > 1280) && (winW <= 1440)) {
        $count = 4;
    } else if (winW <= 1280) {
        $count = 3;
    }

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        slidesPerGroup: $count,
        pagination: {
            el: '.item-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        speed: $speed,
        on: {
            init: function () {
                var $length = $(".item_swiper .swiper-slide").length;
                $item_length.text(Math.ceil($length / $count));
            },
            slideChange: function () {
                $item_counter.text(Math.ceil((this.activeIndex / $count) + 1));
            }
        }
    });


    // section 3 slide 2
    /* var $warehouse = $("#wareHouse"),
        $active_li = $(".txt_bg ul li"),
        $slide_txt = $warehouse.find(".slide_txt"),
        $slide_txtDiv = $slide_txt.find("div"),
        $txt_title = $warehouse.find(".txt_title"),
        $txt_titleh = $txt_title.find("h3");
    var $before_index = 0;

    var swiper_story = new Swiper('.swiper-container.story_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.story_btn',
            prevEl: '.prev_btn.story_btn',
        },
        loop: true,
        speed: $speed,
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: 'no_swipe',
        on: {
            init: function () {
                $slide_txtDiv.eq(0).addClass("active");
                $slide_txtDiv.eq(0).siblings().css({ "opacity": "0" });
                $txt_titleh.eq(0).addClass("active");
                $txt_titleh.eq(0).siblings().css({ "opacity": "0" });
                $active_li.eq(this.realIndex).siblings().css({ zIndex: 0 });
                $active_li.eq(this.realIndex).css({ zIndex: 2 });
            },
            slideChange: function () {
                textEffect(this.realIndex);
            }
        }
    }); */

    /*
    * 선택 슬라이드만 움직이고 다른 이미지들은 z index로 정히 하여 덮어지면서 들어오는 효과
    * 1. z index 정리 하기
    * 2. 선택 카드 옆으로 보내서 들어오기
    * 3. 선택 전 카드가 z index 상위
    * 4. 마스킹 효과 처리하기 - 기준점을 정하고 보여지는 카드가 움직으도록
    *  - 다음 카드 -
    *       위에 있는 카드가 width 값이 0이 되며 접핌
    *  - 이전 카드 -
    *       위에 있는 카드가 width 값이 100이 되면 덮핌
    * */

    /* swiper_story.on("slideNextTransitionStart", function () {
        nextEffect(this.realIndex, $before_index);
        $before_index = this.realIndex;
    });
    swiper_story.on("slidePrevTransitionStart", function () {
        prevEffect(this.realIndex, $before_index);
        $before_index = this.realIndex;
    });
    function nextEffect(realIndex, beforeIndex) {
        $active_li.eq(realIndex).siblings().css({ zIndex: 0, width: "100%" });
        $active_li.eq(beforeIndex).css({ zIndex: 2 });
        $active_li.eq(realIndex).css({ zIndex: 1, width: "100%" });
        TweenMax.to($active_li.eq(beforeIndex), $speed / 1100, { zIndex: 2, width: "0%", ease: Power1.easeInOut });
    }
    function prevEffect(realIndex, beforeIndex) {
        $active_li.eq(realIndex).siblings().css({ zIndex: 0 });
        $active_li.eq(beforeIndex).css({ zIndex: 1 });
        $active_li.eq(realIndex).css({ zIndex: 2, width: 0 });
        TweenMax.to($active_li.eq(realIndex), $speed / 1100, { zIndex: 2, width: "100%", ease: Power1.easeInOut });
    }
    function textEffect(realIndex) {
        // txt_title
        var $active_title = $(".txt_title h3"),
            $active_txt = $(".slide_txt div");
        $active_title.eq(realIndex).removeClass("active");
        $active_title.eq(realIndex).addClass("active");
        $active_txt.eq(realIndex).removeClass("active");
        $active_txt.eq(realIndex).addClass("active");
        TweenMax.to([$active_title.eq(realIndex), $active_txt.eq(realIndex)], $speed / 1000, { opacity: 1 });
        TweenMax.to([$active_title.eq(realIndex).siblings(), $active_txt.eq(realIndex).siblings()], $speed / 1000, { opacity: 0 });
    } */

    // count
    function counter() {
        function numberCounter(target_frame, target_number) {
            this.count = 0;
            this.diff = 0;
            this.target_count = parseInt(target_number);
            this.target_frame = document.getElementById(target_frame);
            this.timer = null;
            this.counter();
        };
        numberCounter.prototype.counter = function () {
            var self = this;
            this.diff = this.target_count - this.count;

            if (this.diff > 0) {
                self.count += Math.ceil(this.diff / 5);
            }

            this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            if (this.count < this.target_count) {
                this.timer = setTimeout(function () {
                    self.counter();
                }, 20);
            } else {
                clearTimeout(this.timer);
            }
        };
        new numberCounter("counter3", 9904200);
        new numberCounter("counter2", 41172);
        new numberCounter("counter1", 88);
    }

    // campaigns_slide
    var swiper = new Swiper('.swiper-container.campaigns_slide', {
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            clickable: true,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 1280px
            0: {
                slidesPerView: 3.5,
                spaceBetween: 18
            },
            1280: {
                slidesPerView: 4.4,
                spaceBetween: 18
            },
            // when window width is >= 1440px
            1440: {
                slidesPerView: 4.65,
                spaceBetween: 17
            },
            // when window width is >= 1600px
            1600: {
                slidesPerView: 5.15,
                spaceBetween: 17
            },
            // when window width is >= 1920px
            1920: {
                slidesPerView: 5.15,
                spaceBetween: 20
            },
        }
    });

}

function scrollEvent() {
    var $subVisual = $("#subVisual");
    $(window).scroll(function () {
        $(".pall_bg").each(function () {
            var offset = $(this).offset();
            var offsetTop = offset.top;
            var _this_h = $(this).innerHeight();
            var _bg_p = (winSc - offsetTop) / _this_h * 100;
            $(this).css({ "background-position-y": -_bg_p.toFixed(2) / 2 + "%" });
        });
        if (winSc < 820) {
            $subVisual.css({ "background-position-y": winSc / 3 });
        }
        headerFix();
    });

    function headerFix() {
        if (winSc > 0) {
            $header.addClass("fixed");
        } else {
            $header.removeClass("fixed");
        }
    }
    headerFix();

    var _containerTop = null;
    var $discoverBtn = $("#discoverBtn");
    $discoverBtn.click(function () {
        _containerTop = $("#container").offset().top - 70;
        TweenMax.to($("html"), .5, { scrollTop: _containerTop, ease: esStep });
    });

    var $jsScrSec = $(".js-scr-sec");
    var scrInnerStep = [];
    if (!$jsScrSec.length) return false;

    function scrollEvent() {
        $window.scroll(function () {
            scrollMotion(winSc);
        });
        $jsScrSec.each(function () {
            var _this = $(this);
            var secTop = _this.offset().top;
            var secInner = secTop - (winH / 2) - 250;
            scrInnerStep.push([_this, secInner]);
        });

        function scrollMotion(_winSc) {
            $.each(scrInnerStep, function (i, v) {
                if (_winSc >= v[1]) {
                    if (v[0].motion === undefined) {
                        TweenMax.staggerTo(v[0].find(".js-scr-box"), .8, {
                            y: 0, opacity: 1, ease: esStep
                        }, .2);
                        v[0].motion = true;
                    }
                    v[0].addClass("js-motion-end");
                }
            });
        }

        scrollMotion(winSc);
    }
    scrollEvent();
}