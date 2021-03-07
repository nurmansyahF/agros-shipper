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
                    margin: 16
                });
            } else {
                slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                slider.find('.owl-stage-outer').children().unwrap();
            }
        })
        $('.service__slider').each(function() {
            var slider = $(this),
                item = slider.find('.slider-item');

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
    })


})();

// $(window).on("unload", function(e) {
//     localStorage.removeItem(myPageDataArr);
// });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG5cclxuICAgICAgICAvLyBJTkxJTkUgU1ZHXHJcbiAgICAgICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1nID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHZhciBpbWdDbGFzcyA9ICRpbWcuYXR0cignY2xhc3MnKTtcclxuICAgICAgICAgICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICAgICAgICAgIH0sICd4bWwnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnNlbGVjdC1jb250cm9sJykuc2VsZWN0cGlja2VyKHtcclxuICAgICAgICAgICAgc2l6ZTogNCxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChtYWluTGF5b3V0LCAxMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoYW5pbWF0aW9uLCAxMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoc2xpZGVyLCAxMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuYywgMTAwKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICB9LCAzMDApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgaW5pdCgpOyAvLyBlbmQgb2YgaW5pdCgpXHJcblxyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KG1haW5MYXlvdXQsIDEwMCk7XHJcbiAgICAgICAgc2V0VGltZW91dChzbGlkZXIsIDEwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWluTGF5b3V0KCkge1xyXG4gICAgICAgIHZhciBoID0gJCgnI2hlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpLFxyXG4gICAgICAgICAgICBtID0gJCgnbWFpbicpLFxyXG4gICAgICAgICAgICBmID0gJCgnI2Zvb3RlcicpLm91dGVySGVpZ2h0KHRydWUpLFxyXG4gICAgICAgICAgICBzZXQgPSBmICsgaDtcclxuXHJcbiAgICAgICAgbS5jc3MoJ21pbi1oZWlnaHQnLCAnY2FsYygxMDB2aCAtICcgKyBzZXQgKyAncHgpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0aW9uKCkge1xyXG4gICAgICAgICQoXCIuYW5pbWF0ZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tX29mX29iamVjdCA9ICQodGhpcykub2Zmc2V0KCkudG9wICsgMTA7XHJcbiAgICAgICAgICAgIHZhciBib3R0b21fb2Zfd2luZG93ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICBpZiAoYm90dG9tX29mX3dpbmRvdyA+IGJvdHRvbV9vZl9vYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGUtLWluJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNsaWRlcigpIHtcclxuICAgICAgICAkKCcuc2NvbXBhbnlfX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHNsaWRlci5maW5kKCcuc2xpZGVyLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYXJnaW46IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIGl0ZW1zOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIDQ4MDp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJy5sb2dpbl9fc2xpZGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIHcgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3IDwgNDI2KSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJCgnLnBvYV9fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBpdGVtID0gc2xpZGVyLmZpbmQoJy5zbGlkZXItaXRlbScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMTZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJy5zZXJ2aWNlX19zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBzbGlkZXIuZmluZCgnLnNsaWRlci1pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNjAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAxNlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzbGlkZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmdW5jKCkge1xyXG5cclxuICAgICAgICAkKCdhW3RhcmdldCE9XCJfYmxhbmtcIl0nKVxyXG4gICAgICAgICAgICAubm90KCdbaHJlZio9XCIjXCJdJylcclxuICAgICAgICAgICAgLm5vdCgnLnNjcm9sbC10bycpXHJcbiAgICAgICAgICAgIC5ub3QoJ1tkYXRhLWxpdHldJylcclxuICAgICAgICAgICAgLm5vdCgnW2RhdGEtcHJvZHVjdF0nKVxyXG4gICAgICAgICAgICAubm90KCcubHNiLXByZXZpZXcnKS5jbGljayhmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICAgICAgICB0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHJlZiA9IHRoaXMuaHJlZjtcclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibGluay10cmFuc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXHJcbiAgICAgICAgICAgICAgICB9LCA1MDApXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvLyAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImxvYWQtcGFnZVwiKTtcclxuICAgICAgICBpZigkKCcubG9hZGluZy1wYWdlJykubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImxvYWQtcGFnZVwiKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3MnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibG9hZGluZ1wiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibG9hZC1wYWdlXCIpO1xyXG4gICAgICAgICAgICB9LCA0NTAwKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgMTAwKTtcclxuXHJcblxyXG4gICAgICAgIC8vIFNUSUNLWSBIRUFERVJcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGhlYWRlciA9ICQoJy5oZWFkZXInKSxcclxuICAgICAgICAgICAgICAgIHBvcyA9IDEwO1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gcG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmFkZENsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hlYWRlci1zdGljaycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGVhZGVyLXN0aWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmhlYWRlcl9fdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuaGFzLXN1YicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJCgnLmhhcy1zdWInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHQudG9nZ2xlQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuaGFzLXN1YicpLm5vdCh0aGlzKS5yZW1vdmVDbGFzcygnc3ViLW9wZW4nKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuc2Nyb2xsLWRvd24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGFyZ2V0KS5vZmZzZXQoKS50b3AgLSAxMDBcclxuICAgICAgICAgICAgICAgIH0sIDkwMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gU01PT1RIIFNDUk9MTFxyXG4gICAgICAgICQoJy5zY3JvbGwtdG8nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSAmJlxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3AgLSA2MFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHRhcmdldC5pcyhcIjpmb2N1c1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5hY2NvcmRpb24nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGMgPSB0LmZpbmQoJy5jb2xsYXBzZScpO1xyXG5cclxuICAgICAgICAgICAgYy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdzaG93Jykpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmFjYycpLmZpbmQoJy5tb3JlbGVzcycpLnRleHQoJ1NIT1cgTEVTUycpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmFjYycpLmZpbmQoJy5tb3JlbGVzcycpLnRleHQoJ1NIT1cgTU9SRScpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmFjYycpLmZpbmQoJy5tb3JlbGVzcycpLnRleHQoJ1NIT1cgTEVTUycpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5pbnB1dC1wYXNzd29yZCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgaSA9IHQuZmluZCgnaW5wdXQnKSxcclxuICAgICAgICAgICAgICAgIGcgPSB0LmZpbmQoJ3NwYW4udG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICBpZihpLmF0dHIoJ3R5cGUnKSA9PSAncGFzc3dvcmQnKSB7XHJcbiAgICAgICAgICAgICAgICB0LmFkZENsYXNzKCdoaWRkZW4nKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkuYXR0cigndHlwZScpID09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICAgICAgdC5hZGRDbGFzcygnc2hvd24nKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBpZih0Lmhhc0NsYXNzKCdoaWRkZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGkuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5hZGRDbGFzcygnc2hvd24nKTtcclxuICAgICAgICAgICAgICAgICAgICB0LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaS5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJylcclxuICAgICAgICAgICAgICAgICAgICB0LmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0LnJlbW92ZUNsYXNzKCdzaG93bicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSAvLyBlbmQgb2YgZnVuY1xyXG5cclxuICAgICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5tb2RhbCcpLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuZm9vdGVyLW1lbnUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB0b2dnbGUgPSB0LmZpbmQoJ3NwYW4uc3ViJyk7XHJcblxyXG4gICAgICAgIHRvZ2dsZS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG5cclxufSkoKTtcclxuXHJcbi8vICQod2luZG93KS5vbihcInVubG9hZFwiLCBmdW5jdGlvbihlKSB7XHJcbi8vICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShteVBhZ2VEYXRhQXJyKTtcclxuLy8gfSk7Il0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
