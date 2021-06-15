$(function(){
    noImg(); // no img

    gnbSubdepth(); // header hover event(pc)
    $('header .btn-menu-all').click(function(){ // gnb open/close event(mobile)
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    moreMenu(); // depth2 open event(mobile)
    dep2tabScroll('.page-tab-wrap .scroll'); // page tab scroll evt

    collapse(); // collapse
    $('.nice-select').niceSelect();
});

function headerScroll() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('header').outerHeight();

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').addClass('scroll');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('scroll');
            }
        }

        lastScrollTop = st;
    }
}

function gnbSubdepth() {
    $('#gnb .dep1:not(:only-child)').on('mouseenter', function(){
        var dep2 = $(this).siblings('.depth2'),
            alldep2 = $('#gnb .depth2');

        $('header').addClass('p-evt');
        alldep2.hide();
        alldep2.removeClass('hover');
        dep2.show();
        setTimeout(function(){
            dep2.addClass('hover');
        }, 50);
    });
    $('#gnb .dep1:only-child').on('mouseenter', function(){
        if ( $('header').hasClass('p-evt') ) {
            $('#gnb .depth2').removeClass('hover');
            setTimeout(function(){
                $('#gnb .depth2').hide();
                $('header').removeClass('p-evt');
            }, 50);
        }
    });
    $('header').on('mouseleave', function(){
        $('#gnb .depth2').removeClass('hover');
        setTimeout(function(){
            $('#gnb .depth2').hide();
            $('header').removeClass('p-evt');
        }, 50);
    });
}

function gnbOpen() {
    var header = $('header'),
        gnb = $('#gnb'),
        menuBtn = $('header .btn-menu-all');

    header.addClass('m-evt');
    gnb.addClass('open');
    menuBtn.addClass('open');

    scrollPrevent(true);
}

function gnbClose() {
    var header = $('header'),
    gnb = $('#gnb'),
    menuBtn = $('header .btn-menu-all');

    scrollPrevent(false);

    gnb.removeClass('open');
    setTimeout(function () {
        menuBtn.removeClass('open');
        header.removeClass('m-evt');
    }, 50);
}

function moreMenu() {
    $('#gnb .dep2-open').on('click', function(){
        var dep2 = $(this).siblings('.depth2'),
            dep1btn = $(this).siblings('.dep1'),
            dep2all = $('#gnb .depth2'),
            dep1all = $('#gnb .dep1');

        if ( dep1btn.hasClass('open') ) {
            dep1btn.removeClass('open');
            dep2.slideUp();
        } else {
            dep2all.slideUp();
            dep1all.removeClass('open');

            dep2.slideDown();
            dep1btn.addClass('open');
        }
    });
}

function scrollPrevent(prop) {
    if ( prop == true ) {
        $('body').css({'overflow':'hidden'});
    } else {
        $('body').css({'overflow':'initial'});
    }
}

function uiTab() {
    var tab = '[data-evt="tab"]';
    $(document).on('click', tab + ' a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var wrapper = 'body';
        var id = $this.attr('href');
        var $target = $('[data-id=' + id + ']');
        var $siblings = $this.parents('li').siblings('').find('a');

        $siblings.each(function () {
            var id = $(this).attr('href');
            $(this).parents('li').removeClass('active');
            $('[data-id=' + id + ']').hide();
        });
        $this.parents('li').addClass('active');
        $target.show();

        return false;
    });
}

function collapse() {
    var collapseBtn = $('[data-toggle="collapse"]');

    collapseBtn.on('click', function(){
        var target = $(this).data('target'),
            openTxt = $(this).data('opentext'),
            closeTxt = $(this).data('closetext');

        if ( $(target).hasClass('open') ) {
            $(target).removeClass('open');
            $(this).removeClass('open');
            $(this).attr('aria-expanded', false);
            $(this).find('.blind').text(openTxt);
        } else {
            $(target).addClass('open');
            $(this).addClass('open');
            $(this).attr('aria-expanede', true);
            $(this).find('.blind').text(closeTxt);
        }
    });
}

function imgSwitch() {
    $('[data-toggle="imgView"]').on('click', function(){
        var thumb = $(this),
            sibl = thumb.parent('.swiper-slide').siblings('').find('[data-toggle="imgView"]'),
            src = thumb.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
            wrap = thumb.parents('.product-intro'),
            target = wrap.find('[data-toggle="imgSwitch"]');

            console.log(src);

        // thumb click evt
        sibl.removeClass('active');
        thumb.addClass('active');
        
        // img switch
        target.css('opacity', 0);
        setTimeout(function(){
            target.css('background-image', 'url("'+src+'")');
            target.css('opacity', 1);
        }, 200);
    });
}

function minHeight() {
    $(window).resize(function(){
        var ow = $(this).outerWidth();

        if ( ow < 768 ) return;

        $('.product-intro').each(function(){
            var imgH = $(this).find('.img-view').outerHeight();
    
            $(this).css('min-height', imgH);
        });
    });
    
    var ow = $(window).outerWidth();
    if ( ow < 768 ) return;
    
    $('.product-intro').each(function(){
        var imgH = $(this).find('.img-view').outerHeight();

        $(this).css('min-height', imgH);
    });
}

function videoModal() {
    var obj = '[data-control="modal"]',
        $obj = $(obj),
        $target = $('#video'),
        $tit = $target.find('.tit'),
        $desc = $target.find('.desc'),
        $date = $target.find('.date'),
        $src = $target.find('iframe'),
        dim = '<div class="common-dim" aria-hidden="true">&nbsp;</div>';

    $obj.on('click', function(e){
        e.preventDefault();
        var infos = $(this).parents('.items').find('.info'),
            tit = infos.find('.tit').text(),
            desc = infos.find('.desc').text(),
            date = infos.find('.date').html();
            src = infos.find('.src').text();
            option = '?controls=0';

        $tit.text(tit);
        $desc.text(desc);
        $date.html(date);
        $src.attr('src', src+option);

        $target.before(dim);
        $target.show();
    });

    var close = $target.find('.btn-close');

    close.on('click', function(){
        $target.hide();
        $('body').find('.common-dim').remove();

        $tit.text(' ');
        $desc.text(' ');
        $date.html(' ');
        $src.attr('src', ' ');
    });
}

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width);
    });
}

// iscroll (2dpeth tab)
function dep2tabScroll(obj) {
    $(window).on('load', function(){
        var $obj = $(obj),
            tabs = $obj.find('.tabs'),
            bp = $(window).outerWidth(true);

        if ( $(obj).length <= 0 ) {
            return
        } else {
            tabs.each(function(){
                var $tabs = $(this),
                    wraps = $tabs.parent('.scroll'),
                    child = $tabs.children(),
                    childLength = child.length,
                    width = 0,
                    minWidth = childLength * 195;
        
                child.each(function(){
                    width += $(this).outerWidth(true);
                });
                $tabs.css('width', width);

                $(window).resize(function(){
                    var winOw = $(this).outerWidth(true),
                        newWidth = wraps.outerWidth();

                    if ( winOw < 1024 ) { // tablet
                        calcWidth(tabs);
                    } else { // pc
                        if (width < newWidth) {
                            $tabs.width(newWidth);
                        } else {
                            if (minWidth < newWidth) {
                                $tabs.width(newWidth);
                            } else {
                                $tabs.width(minWidth);
                            }
                        }
                    }
                });
            });

            new IScroll(obj , {
                scrollX : true,
                scrollY : false,
                mouseWheel : false,
                autoCenterScroll : true,
            });
        }
    });
}

function noImg() {
    $(window).on('load', function() {
        $('img').each(function() {
            if ( !this.complete||typeof this.naturalWidth == "undefined"||this.naturalWidth == 0 ) {
                var original = this.src;
                var name = original.replace(/^.*\//, '');

                this.src = '/images/@noimg.gif';
                this.alt = name + ' 이미지 없음';
            }
        });
    });
}

function hashTabActive() {
    var hash = location.hash;
    if (hash.length <= 0) {
        uiTab();
        $('[data-evt="tab"] > li:first-child a').click();
    } else {
        var hashName = hash.slice(1),
            tabs = $('.sub-tab-wrap'),
            lis = tabs.find('.tabs').children('li'),
            active = tabs.find('a[href='+hashName+']'),
            activeLi = active.parent('li');
    
        lis.removeClass('active');
        activeLi.addClass('active');
        $('.tab-contents').hide();
        $('[data-id='+hashName+']').show();

        // collapse tab evt
        if (activeLi.is(':visible')) return;

        var toggleTab = tabs.find('.tabs'),
            toggleBtn = toggleTab.siblings('button'),
            closeTxt = toggleBtn.data('closetext');

        toggleTab.addClass('open');
        toggleBtn.addClass('open');
        toggleBtn.attr('aria-expanede', true);
        toggleBtn.find('.blind').text(closeTxt);
    }
}