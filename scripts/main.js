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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG5cclxuICAgICAgICAvLyBJTkxJTkUgU1ZHXHJcbiAgICAgICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1nID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHZhciBpbWdDbGFzcyA9ICRpbWcuYXR0cignY2xhc3MnKTtcclxuICAgICAgICAgICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICAgICAgICAgIH0sICd4bWwnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnNlbGVjdC1jb250cm9sJykuc2VsZWN0cGlja2VyKHtcclxuICAgICAgICAgICAgc2l6ZTogNCxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChtYWluTGF5b3V0LCAxMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoYW5pbWF0aW9uLCAxMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoc2xpZGVyLCAxMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuYywgMTAwKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICB9LCAzMDApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgaW5pdCgpOyAvLyBlbmQgb2YgaW5pdCgpXHJcblxyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KG1haW5MYXlvdXQsIDEwMCk7XHJcbiAgICAgICAgc2V0VGltZW91dChzbGlkZXIsIDEwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWluTGF5b3V0KCkge1xyXG4gICAgICAgIHZhciBoID0gJCgnI2hlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpLFxyXG4gICAgICAgICAgICBtID0gJCgnbWFpbicpLFxyXG4gICAgICAgICAgICBmID0gJCgnI2Zvb3RlcicpLm91dGVySGVpZ2h0KHRydWUpLFxyXG4gICAgICAgICAgICBzZXQgPSBmICsgaDtcclxuXHJcbiAgICAgICAgbS5jc3MoJ21pbi1oZWlnaHQnLCAnY2FsYygxMDB2aCAtICcgKyBzZXQgKyAncHgpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0aW9uKCkge1xyXG4gICAgICAgICQoXCIuYW5pbWF0ZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tX29mX29iamVjdCA9ICQodGhpcykub2Zmc2V0KCkudG9wICsgMTA7XHJcbiAgICAgICAgICAgIHZhciBib3R0b21fb2Zfd2luZG93ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICBpZiAoYm90dG9tX29mX3dpbmRvdyA+IGJvdHRvbV9vZl9vYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGUtLWluJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNsaWRlcigpIHtcclxuICAgICAgICAkKCcuc2NvbXBhbnlfX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHNsaWRlci5maW5kKCcuc2xpZGVyLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYXJnaW46IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIGl0ZW1zOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDQ4MDp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJy5sb2dpbl9fc2xpZGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIHcgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3IDwgNDI2KSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJCgnLnBvYV9fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBpdGVtID0gc2xpZGVyLmZpbmQoJy5zbGlkZXItaXRlbScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hcmdpbjogMTZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJy5zZXJ2aWNlX19zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBzbGlkZXIuZmluZCgnLnNsaWRlci1pdGVtJyk7XHJcbiAgICAgICAgICAgIHZhciB3ID0gJCggd2luZG93ICkud2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHcgPiA3Njgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMTZcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNjAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDE2XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNsaWRlcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcblxyXG4gICAgICAgICQoJ2FbdGFyZ2V0IT1cIl9ibGFua1wiXScpXHJcbiAgICAgICAgICAgIC5ub3QoJ1tocmVmKj1cIiNcIl0nKVxyXG4gICAgICAgICAgICAubm90KCcuc2Nyb2xsLXRvJylcclxuICAgICAgICAgICAgLm5vdCgnW2RhdGEtbGl0eV0nKVxyXG4gICAgICAgICAgICAubm90KCdbZGF0YS1wcm9kdWN0XScpXHJcbiAgICAgICAgICAgIC5ub3QoJy5sc2ItcHJldmlldycpLmNsaWNrKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICAgICAgICAgIHQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBocmVmID0gdGhpcy5ocmVmO1xyXG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJsaW5rLXRyYW5zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWZcclxuICAgICAgICAgICAgICAgIH0sIDUwMClcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vICQoXCJib2R5XCIpLmFkZENsYXNzKFwibG9hZC1wYWdlXCIpO1xyXG4gICAgICAgIGlmKCQoJy5sb2FkaW5nLXBhZ2UnKS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibG9hZC1wYWdlXCIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncycpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJsb2FkLXBhZ2VcIik7XHJcbiAgICAgICAgICAgIH0sIDQ1MDApXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhJylcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCAxMDApO1xyXG5cclxuXHJcbiAgICAgICAgLy8gU1RJQ0tZIEhFQURFUlxyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gJCgnLmhlYWRlcicpLFxyXG4gICAgICAgICAgICAgICAgcG9zID0gMTA7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBwb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGVhZGVyLXN0aWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaGVhZGVyX190b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5idG4tbm90aWYgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbm90aWYtb3BlbicpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkKCcuaGFzLXN1YicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdC50b2dnbGVDbGFzcygnc3ViLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICQoJy5oYXMtc3ViJykubm90KHRoaXMpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5zY3JvbGwtZG93bicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtIDEwMFxyXG4gICAgICAgICAgICAgICAgfSwgOTAwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBTTU9PVEggU0NST0xMXHJcbiAgICAgICAgJCgnLnNjcm9sbC10bycpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpICYmXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsgJ10nKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIDYwXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgODAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKFwiOmZvY3VzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmFjY29yZGlvbicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgYyA9IHQuZmluZCgnLmNvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgICAgICBjLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3Nob3cnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuYWNjJykuZmluZCgnLm1vcmVsZXNzJykudGV4dCgnU0hPVyBMRVNTJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuYWNjJykuZmluZCgnLm1vcmVsZXNzJykudGV4dCgnU0hPVyBNT1JFJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuYWNjJykuZmluZCgnLm1vcmVsZXNzJykudGV4dCgnU0hPVyBMRVNTJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmlucHV0LXBhc3N3b3JkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBpID0gdC5maW5kKCdpbnB1dCcpLFxyXG4gICAgICAgICAgICAgICAgZyA9IHQuZmluZCgnc3Bhbi50b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGkuYXR0cigndHlwZScpID09ICdwYXNzd29yZCcpIHtcclxuICAgICAgICAgICAgICAgIHQuYWRkQ2xhc3MoJ2hpZGRlbicpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaS5hdHRyKCd0eXBlJykgPT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgICAgICB0LmFkZENsYXNzKCdzaG93bicpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGcuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIGlmKHQuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0LmFkZENsYXNzKCdzaG93bicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKVxyXG4gICAgICAgICAgICAgICAgICAgIHQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQucmVtb3ZlQ2xhc3MoJ3Nob3duJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnZGl2LnNlYXJjaCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgZmMgPSB0LmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcclxuICAgICAgICAgICAgZmMub24oJ2tleWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5hZGRDbGFzcygnc3VnZXN0LXNob3cnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHQucmVtb3ZlQ2xhc3MoJ3N1Z2VzdC1zaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc291bmQoKXtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvICA9IG5ldyBBdWRpbygnaHR0cHM6Ly9zMy11cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9zLmNkcG4uaW8vMjQyNTE4L2NsaWNrLm1wMycpO1xyXG4gICAgICAgICAgICAvLyB2YXIgYXVkaW8gID0gbmV3IEF1ZGlvKCcuLi9pbWFnZXMvY2xpY2subXAzJyk7XHJcbiAgICAgICAgICAgIC8vIHZhciBhdWRpbzIgPSBuZXcgQXVkaW8oJ2h0dHBzOi8vczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vcy5jZHBuLmlvLzI0MjUxOC9jbGlja1VwLm1wMycpXHJcbiAgICAgICAgICAgIGF1ZGlvLmxvYWQoKTtcclxuICAgICAgICAgICAgaWYoJCgnLmJsaW5rJykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyBhdWRpbzIubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwxMDAwKTtcclxuICAgICAgICAgICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYmxpbmsnKS50b2dnbGVDbGFzcygnYmxpbmtlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSwxMzAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzb3VuZCgpO1xyXG4gICAgICAgIH0sMzIwMCk7XHJcblxyXG4gICAgfSAvLyBlbmQgb2YgZnVuY1xyXG5cclxuICAgICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5tb2RhbCcpLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuZm9vdGVyLW1lbnUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB0b2dnbGUgPSB0LmZpbmQoJ3NwYW4uc3ViJyk7XHJcblxyXG4gICAgICAgIHRvZ2dsZS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuYW5uby1vdmVybGF5JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7JCgnYm9keScpLnJlbW92ZUNsYXNzKCduby1zY3JvbGwnKTt9KTtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbm8tc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCduby1zY3JvbGwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LCA0OTAwKVxyXG5cclxuXHJcblxyXG59KSgpO1xyXG5cclxuLy8gJCh3aW5kb3cpLm9uKFwidW5sb2FkXCIsIGZ1bmN0aW9uKGUpIHtcclxuLy8gICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG15UGFnZURhdGFBcnIpO1xyXG4vLyB9KTsiXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
