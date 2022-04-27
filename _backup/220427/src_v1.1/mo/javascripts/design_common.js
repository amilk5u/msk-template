"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;
var $header = $("#header");

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });

    main();
    hash();
});
function hash() {
    var dataHash = [];
    var $hashval=0;
    $(".dataHash").each(function() {
        if($(this).attr("id")){
            var ahref = $(this).attr("id");
            dataHash.push("#"+ahref);
        }
    });
    //스크롤 기능
    $(window).scroll(function(){
        //변수 설정
        var windowPos = $(window).scrollTop();
        //header
        if(windowPos > 10){
            TweenMax.to($("header") , 0.3 , {backgroundColor : "#fff"});
        }else{
            TweenMax.to($("header") , 0.3 , {backgroundColor : "transparent"});
        }
        //hash 적용
        for (var i=0; i < dataHash.length; i++) {
            var theID = dataHash[i];
            var divPos = $(theID).offset().top;
            var divHeight = $(theID).height();
            if (windowPos >= (divPos) && windowPos < (divPos + divHeight)) {
                if($hashval !== (i)){
                    history.replaceState("","",theID);
                    $hashval=i;
                    if(dataHash[$hashval] === "#effect"){
                        counter();
                    }
                }
            }
        }
    });

    // 이동 버튼 클릭
    var pageNum = 0;
    $(".page_btn button").on("click" , function () {
        if($(this).hasClass("prev_con") ){
            pageNum = --$hashval;
            if(pageNum  === -1 ) pageNum = 0 ;
        }else{
            pageNum = ++$hashval;
        }
        var headerH = $("header").height()+20;
        var scrollPosition = $(dataHash[pageNum]).offset().top;
        TweenMax.to($("html"), 0.5 , {scrollTop: scrollPosition-headerH});
    })
    // count
    function counter() {
        function numberCounter(target_frame) {

            this.count = 0;
            this.diff = 0;
            this.target_frame = document.querySelector(target_frame);
            // text 값 문자열 받아서 숫자만 남기기
            this.target_Number_Text = this.target_frame.innerText;
            this.target_Number_Text = this.target_Number_Text.replace(/[^0-9]/g,"");
            this.target_Number_Text = Number(this.target_Number_Text);
            this.target_count = parseInt(this.target_Number_Text);
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
        new numberCounter(".counter3");
        new numberCounter(".counter2");
        new numberCounter(".counter1");
    }

}
function main() {
    var $speed = 800;
    var swiper_visual = new Swiper('.swiper-container.visual_swiper', {
        slidesPerView: "auto",
        speed: $speed,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    var item_view = 2,
        item_length = null,
        item_counter = 0;

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        freeMode: true,
        speed: $speed,
        slidesPerGroup: item_view,
        pagination: {
            el: '.item-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        on:{
            init:function(){
                item_length = $(".item_swiper  .swiper-slide").length;
                $(".control_box .length").text(Math.ceil(item_length/item_view));
            },
            slideChange:function () {
                // console.log($(".swiper-pagination-current").text());

            }
        }
    });

    var swiper_activist= new Swiper('.swiper-container.activist_swiper', {
        slidesPerView: "auto",
        loop : true,
        speed: $speed,
        centeredSlides: true,
        centeredSlidesBounds: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    var swiper_campaigns = new Swiper('.swiper-container.campaigns_swiper', {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        speed: $speed,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
}