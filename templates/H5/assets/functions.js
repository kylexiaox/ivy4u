(function() {

    var pageFunc,
        mySwiper,
        score=[], total,  //记录测试题得分与总分
        quizBegin=1, quizEnd=9;  //测试题开始与结束的页码

    document.onreadystatechange = function () {
        if (document.readyState == "complete" ) {  //页面加载完成，执行相应代码
            $(".loading").addClass("loading_hide");
            setTimeout(function() {
                $(".loading").hide();
            }, 500);
        } 
    };

    $(document).ready(function () {
        mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            speed: 300,
            effect: 'slide',
            noSwipingClass: 'noSwipe',

            // If we need pagination
            pagination: '.swiper-pagination',
            paginationBulletRender: function (index, className) {
                return ['<span class="', className, ' bullet_', index, '"></span>'].join("");
            },
            // 页面切换时的逻辑
            onSlideChangeEnd: function (argument) {
                //只在quiz页显示进度
                if (mySwiper.activeIndex > quizBegin-1 && mySwiper.activeIndex < quizEnd+1) {
                    $(".swiper-pagination").show();
                } else {
                    $(".swiper-pagination").hide();
                }
                //quiz加载后的特殊动画
                switch (mySwiper.activeIndex) {
                    case 2:  //quiz2
                        break;
                    default:
                        break;
                }
            }
        })        

        pageFunc.init();
        pageFunc.quiz();
        pageFunc.share();
        pageFunc.landingAnim();
    });

    pageFunc = {
        // 初始化
        init: function () {
            document.ontouchmove = function(e){  //禁止窗口的默认滑动
                e.preventDefault();
            }
            document.body.addEventListener('touchstart',function(){},false);  //触发:active效果
            mySwiper.lockSwipeToNext();  //禁止向后翻页
            //点击开始按钮向后翻页
            $('body').on('click', '.start', function () {
                mySwiper.unlockSwipeToNext();
                mySwiper.slideNext(true, 300);
                mySwiper.lockSwipeToNext();
            })
       },
        // 点击题目选项逻辑
        quiz: function () {
            $('body').on('click', '.quiz_item', function () {  //点击题目选项
                score[mySwiper.activeIndex-quizBegin] = $(this).attr('rel');  //记录选项分数
                $(['.quiz-', mySwiper.activeIndex-quizBegin+1, " .quiz_item"].join("")).removeClass('quiz_item_selected');
                $(this).addClass('quiz_item_selected');
                if (mySwiper.activeIndex <= quizEnd-1) {  //前几题
                    //点击quiz选项后的特殊动画
                    switch (mySwiper.activeIndex) {
                        case 2:  //quiz2
                            pageFunc.quiz2Anim();
                            break;
                        default:
                            pageFunc.nextPage();
                            break;
                    }
                } else {  //最后一题
                    mySwiper.unlockSwipeToNext();  //允许向后翻页
                    total = eval(score.join("+"));  //计算总分
                    if (total < 19) {
                        mySwiper.slideTo(10, 300, true);
                    } else if (total < 29) {
                        mySwiper.slideTo(11, 300, true);
                    } else if (total < 36) {
                        mySwiper.slideTo(12, 300, true);
                    } else if (total < 42) {
                        mySwiper.slideTo(13, 300, true);
                    } else if (total < 50) {
                        mySwiper.slideTo(14, 300, true);
                    } else {
                        mySwiper.slideTo(15, 300, true);
                    }
                }
            })
        },
        // 显示/隐藏分享提示
        share: function () {  //显示隐藏右上角分享提示
            $('body').on('click', '.share', function () {
                $('.share_mask').addClass('share_mask_on');
            })
            $('body').on('click', '.share_mask', function () {
                $('.share_mask').removeClass('share_mask_on');
            })
        },
        // 翻下一页
        nextPage: function () {
            mySwiper.unlockSwipeToNext();  //允许向后翻页
            mySwiper.slideNext(true, 300);
            mySwiper.lockSwipeToNext();  //禁止向后翻页
        },
        // 首页动画
        landingAnim: function () {
            // 箭头弹跳
            var arrowJump = new TimelineMax();
            arrowJump.to("#landing_arrow", 0.5, {x:2, y:13, ease:Power1.easeInOut, repeat:-1, yoyo:true});
            var arrowJump2 = new TimelineMax();
            arrowJump2.fromTo("#landing_arrow2", 0.8, {rotationZ:'14deg'}, {rotationZ:'14deg', y:8, ease:Power1.easeInOut, repeat:-1, yoyo:true});
            // 首页转场
            $('body').on('click', '#landing_outline', function () {
                var opening = new TimelineMax();
                opening.to("#landing_outline", 0.2, {opacity:0, scale:1.2, ease:Power2.easeOut})
                    .to("#landing_arrow", 0.2, {opacity:0, ease:Power2.easeOut}, "-=0.2")
                    .to("#landing_australia_shadow", 0.5, {opacity:0, scale:1.2, ease:Power2.easeOut}, "-=0.1")
                    .to(".australia", 0.3, {x:190, y:-110, scale:1.8, ease:Back.easeOut.config(0.5)})
                    .to("#landing_route", 0.3, {opacity:1, scale:0.5, ease:Power2.easeOut})
                    .to("#slogen", 0.3, {rotationZ:-11, x:-60, y:-50, scale:0.7, ease:Power2.easeOut})
                    .fromTo("#landing_family", 0.3, {x:-300}, {x:0, ease:Power2.easeOut}, "-=0.25")
                    .fromTo("#landing_bg2", 0.3, {y:-300}, {y:0, ease:Back.easeOut.config(0.5)}, "-=0.25")
                    .fromTo("#landing_bg", 0.35, {y:-300}, {y:0, ease:Back.easeOut.config(0.5)}, "-=0.25")
                    .fromTo(".layout2", 0.3, {opacity:0}, {opacity:1, display:'block', ease:Power2.easeOut})
                    //#########################test
                    .to("#landing_family", 0.3, {x:-300, opacity:0, ease:Power2.easeOut}, "+=0.3")
                    .to(".australia", 0.3, {x:500, opacity:0, ease:Power2.easeOut}, "-=0.3")
                    .to("#landing_bg", 0.3, {y:-300, opacity:0, ease:Back.easeOut.config(0.5)}, "-=0.3")
                    .to("#landing_bg2", 0.3, {y:-300, opacity:0, ease:Back.easeOut.config(0.5)}, "-=0.3")
                    .to("#slogen", 0.3, {y:-385, opacity:0, ease:Power2.easeOut}, "-=0.3")
                    .to(".layout2 p", 0.8, {y:0, ease:Power2.easeOut}, "-=0.3")
                    .fromTo(".layout2 span", 0.3, {y:50}, {y:0, display:'block', ease:Power2.easeOut}, "-=0.3")
                    .fromTo(".australia2", 0.5, {scale:0, x:20}, {scale:1, x:20, display:'block', ease:Back.easeOut.config(1.2)}, "-=0.3")
                    .fromTo(".australia2", 0.8, {opacity:1}, {opacity:0.7, ease:Power1.easeInOut, repeat:-1, yoyo:true})
            })
        },
        // quiz2动画
        quiz2Anim: function () {
            var quiz2Timeline = new TimelineMax();
            quiz2Timeline.to(".quiz-2 .item_group", 0.5, {opacity:0, scale:0.95, ease:Power2.easeOut})
                .fromTo(".quiz-2 .photos", 0.3, {opacity:0}, {opacity:1, display:'-webkit-flex', display:'flex', ease:Power2.easeOut})
                .fromTo(".quiz-2 #quiz2_img1", 0.3, {x:100, y:150, scale:1.1, rotationZ:0}, {x:10, y:-20, scale:1.1, rotationZ:8, ease:Power2.easeOut}, "-=0.3")
                .fromTo(".quiz-2 #quiz2_img2", 0.3, {x:-100, y:150, scale:1.1, rotationZ:0}, {x:-10, y:-20, scale:1.1, rotationZ:-5, ease:Power2.easeOut}, "-=0.2")
                .fromTo(".quiz-2 #quiz2_img3", 0.3, {x:100, y:50, scale:1.1, rotationZ:0}, {x:10, y:-20, scale:1.1, rotationZ:2, ease:Power2.easeOut}, "-=0.2")
                .fromTo(".quiz-2 #quiz2_img4", 0.3, {x:-100, y:50, scale:1.1, rotationZ:0}, {x:0, y:-20, scale:1.1, rotationZ:3, ease:Power2.easeOut}, "-=0.2")
                .fromTo(".quiz-2 #quiz2_img5", 0.3, {x:100, y:-50, scale:1.1, rotationZ:0}, {x:-10, y:-20, scale:1.1, rotationZ:-2, ease:Power2.easeOut}, "-=0.2")
                .fromTo(".quiz-2 #quiz2_img6", 0.3, {x:-100, y:-50, scale:1.1, rotationZ:0}, {x:0, y:-20, scale:1.1, rotationZ:5, ease:Power2.easeOut}, "-=0.2")
                .to(".quiz-2 .photos", 0.3, {opacity:0, display:'none', ease:Power2.easeOut, onComplete:pageFunc.nextPage}, "+=2")
                .to(".quiz-2 .item_group", 0.5, {opacity:1, scale:1, ease:Power2.easeOut})
        }
    }


}).call(this);