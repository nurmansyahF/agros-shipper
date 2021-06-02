(function() {
    'use strict';

    function init() {

        // INLINE SVG
        jQuery('img.svg').each(function(i) {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                var $svg = jQuery(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);
            }, 'xml');
        });

        $('.select-control').selectpicker({
            size: 4,
            width: '100%',
        });

        setTimeout(mainLayout, 100);
        setTimeout(animation, 100);
        setTimeout(slider, 100);
        setTimeout(func, 100);

        $(window).scroll(function() {
            setTimeout(function() {
                animation();
            }, 300)
        });

    }
    init(); // end of init()

    $(window).resize(function() {
        setTimeout(mainLayout, 100);
        setTimeout(slider, 100);
    });

    function mainLayout() {
        var h = $('#header').outerHeight(true),
            m = $('main'),
            f = $('#footer').outerHeight(true),
            set = f + h;

        m.css('min-height', 'calc(100vh - ' + set + 'px)');
    }

    function animation() {
        $(".animate").each(function() {
            var bottom_of_object = $(this).offset().top + 10;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $(this).addClass('animate--in');
            }
        })
    }

    function slider() {
        $('.scompany__slider').each(function() {
            var slider = $(this),
                item = slider.find('.slider-item');

            if (item.length > 1) {
                slider.owlCarousel({
                    items: 1,
                    loop: true,
                    dots: true,
                    nav: false,
                    autoplay: true,
                    autoplayTimeout: 6000,
                    autoplaySpeed: 800,
                    // margin: 100,
                    // responsive: {
                    //     0:{
                    //       items: 1
                    //     },
                    //     480:{
                    //       items: 3
                    //     }
                    // }
                });
            } else {
                slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                slider.find('.owl-stage-outer').children().unwrap();
            }
        })
        $('.login__slide').each(function() {
            var slider = $(this),
                w = $(window).width();

            if (w < 426) {
                slider.addClass('owl-carousel');
                slider.owlCarousel({
                    items: 1,
                    loop: false,
                    dots: true,
                    nav: false,
                    autoplay: false,
                });
            } else {
                slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                slider.find('.owl-stage-outer').children().unwrap();
            }
        })
        $('.poa__slider').each(function() {
            var slider = $(this),
                item = slider.find('.slider-item');

            if (item.length > 1) {
                slider.owlCarousel({
                    items: 1,
                    loop: false,
                    dots: false,
                    nav: false,
                    autoplay: false,
                    autoplayTimeout: 6000,
                    autoplaySpeed: 800,
                    // margin: 16
                });
            } else {
                slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                slider.find('.owl-stage-outer').children().unwrap();
            }
        })
        $('.service__slider').each(function() {
            var slider = $(this),
                item = slider.find('.slider-item');
            var w = $( window ).width();

            if(w > 768){
                if (item.length > 1) {
                    slider.owlCarousel({
                        items: 2,
                        loop: false,
                        dots: false,
                        nav: false,
                        autoplay: false,
                        autoplayTimeout: 6000,
                        autoplaySpeed: 800,
                        margin: 16
                    });
                } else {
                    slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                    slider.find('.owl-stage-outer').children().unwrap();
                }
            }else{
                if (item.length > 1) {
                    slider.owlCarousel({
                        items: 1,
                        loop: false,
                        dots: false,
                        nav: false,
                        autoplay: false,
                        autoplayTimeout: 6000,
                        autoplaySpeed: 800,
                        margin: 16
                    });
                } else {
                    slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                    slider.find('.owl-stage-outer').children().unwrap();
                }
            }


        })
    }
    slider();

    function func() {

        $('a[target!="_blank"]')
            .not('[href*="#"]')
            .not('.scroll-to')
            .not('[data-lity]')
            .not('[data-product]')
            .not('.lsb-preview').click(function(t) {
                t.preventDefault();
                var href = this.href;
                $("body").addClass("link-transition");
                setTimeout(function() {
                    window.location = href
                }, 500)
            })


        // $("body").addClass("load-page");
        if($('.loading-page').length < 1) {
            $("body").addClass("load-page");
            // console.log('s')
        } else {
            $("body").addClass("loading");
            setTimeout(function() {
                $("body").addClass("load-page");
            }, 4500)
            // console.log('a')
        }
        $("html, body").animate({ scrollTop: 0 }, 100);


        // STICKY HEADER
        if ($('.header').length > 0) {
            var header = $('.header'),
                pos = 10;
            $(window).on('scroll', function() {
                var scroll = $(window).scrollTop();
                if (scroll >= pos) {
                    header.addClass('sticky');
                    $('body').addClass('header-stick');
                } else {
                    header.removeClass('sticky');
                    $('body').removeClass('header-stick');
                }
            });
        }

        $('.header__toggle').click(function(){
            $('body').toggleClass('menu-open');
        })

        $('.btn-notif a').click(function(){
            $('body').toggleClass('notif-open');
        })

        $('.has-sub').each(function() {
            var t = $(this);
            $('.has-sub').click(function() {
                t.toggleClass('sub-open');
                $('.has-sub').not(this).removeClass('sub-open');
            })
        })

        $('.scroll-down').each(function() {
            var target = $(this).data('target');
            $(this).click(function() {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 100
                }, 900);
            })
        })

        // SMOOTH SCROLL
        $('.scroll-to').click(function(event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 60
                    }, 800, function() {
                        var $target = $(target);
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                        };
                    });
                }
            }
        });

        $('.accordion').each(function(){
            var t = $(this),
                c = t.find('.collapse');

            c.each(function(){
                if($(this).hasClass('show')){
                    $(this).closest('.acc').find('.moreless').text('SHOW LESS')
                }
                $(this).on('hidden.bs.collapse', function(){
                    $(this).closest('.acc').find('.moreless').text('SHOW MORE')
                })
                $(this).on('shown.bs.collapse', function(){
                    $(this).closest('.acc').find('.moreless').text('SHOW LESS')
                })
            })
        })

        $('.input-password').each(function(){
            var t = $(this),
                i = t.find('input'),
                g = t.find('span.toggle');

            if(i.attr('type') == 'password') {
                t.addClass('hidden')
            } else if (i.attr('type') == 'text') {
                t.addClass('shown')
            }

            g.click(function(){
                $(this).toggleClass('open');
                if(t.hasClass('hidden')) {
                    i.attr('type', 'text');
                    t.addClass('shown');
                    t.removeClass('hidden');
                } else {
                    i.attr('type', 'password')
                    t.addClass('hidden');
                    t.removeClass('shown');
                }
            })
        })

        $('div.search').each(function(){
            var t = $(this),
                fc = t.find('.form-control');
            fc.on('keydown', function() {
                if($(this).val() != ""){
                    t.addClass('sugest-show');
                }else{
                    t.removeClass('sugest-show');
                }
            })
        })

        function sound(){
            var audio  = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
            // var audio  = new Audio('../images/click.mp3');
            // var audio2 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3')
            audio.load();
            if($('.blink').length > 0){
                // audio2.load();
                // setInterval(function() {
                //     audio.play();
                // },1000);
                setInterval(function() {
                    audio.play();
                    $('.blink').toggleClass('blinked');
                },1300);
            }
        }
        setTimeout(function() {
            sound();
        },3200);

    } // end of func

    $('.modal').on('show.bs.modal', function(e) {
        $('html').addClass('modal-open');
        $('body').removeClass('menu-open');
    })

    $('.modal').on('hide.bs.modal', function(e) {
        $('html').removeClass('modal-open');
    })

    $('.footer-menu').each(function(){
        var t = $(this),
            toggle = t.find('span.sub');

        toggle.click(function(){
            t.toggleClass('show');
        })
    });
    setTimeout(function() {
        $('.anno-overlay').each(function(){
            $(this).click(function(){$('body').removeClass('no-scroll');});
            if($(this).length > 0){
                $('body').addClass('no-scroll');
            }else{
                $('body').removeClass('no-scroll');
            }
        })
    }, 4900)



})();

// $(window).on("unload", function(e) {
//     localStorage.removeItem(myPageDataArr);
// });