// header
$(function () {
    $(window).on('scroll', function () {
        $('header').toggleClass('fixed', $(window).scrollTop() > 0);
    }).trigger('scroll');
});

// util + popup
$(function () {
    $('.openpopup > a').on('click', function (e) {
        e.preventDefault();
        $('.openlang').removeClass('openlang-select');
        $('.search-box').removeClass('search-box-show');
        $('.openmenu').removeClass('openmenu-close');
        $('.gnb-mobile-box').removeClass('gnb-mobile-open');
        $('header').removeClass('header-blue');
        $('.popup').addClass('popup-show');
        $('body').addClass('over-hidden');
        const paddingTopVal = $('.header-inner').outerHeight() + 20;
        $('.popup-box').css('padding-top', paddingTopVal + 'px');
    });
    $('.popup-close').on('click', function (e) {
        e.preventDefault();
        $('.popup').removeClass('popup-show');
        $('body').removeClass('over-hidden');
    });
});

// util + search
$(function () {
    $('.opensearch > a').on('click', function (e) {
        e.preventDefault();
        $('.openlang').removeClass('openlang-select');
        $('.openmenu').removeClass('openmenu-close');
        $('.gnb-mobile-box').removeClass('gnb-mobile-open');
        $('header').removeClass('header-blue');
        $('body').removeClass('over-hidden');
        $('.search-box').toggleClass('search-box-show');
        $('header').toggleClass('header-white');
    });
    $('.search-close').on('click', function (e) {
        e.preventDefault();
        $('.search-box').removeClass('search-box-show');
        $('header').removeClass('header-white');
    });
});

// util + lang
$(function () {
    $('.openlang > a').on('click', function (e) {
        e.preventDefault();
        $('.search-box').removeClass('search-box-show');
        $('.openmenu').removeClass('openmenu-close');
        $('.gnb-mobile-box').removeClass('gnb-mobile-open');
        $('header').removeClass('header-blue');
        $('body').removeClass('over-hidden');
        const $parent = $(this).parent();
        $parent.toggleClass('openlang-select');
        if ($parent.hasClass('openlang-select')) {
            const headerHeight = $('.header-inner').outerHeight();
            const openlangHeight = $parent.outerHeight();
            const offset = (headerHeight - openlangHeight) / 2;
            $parent.find('> ul').css('top', 'calc(100% + ' + offset + 'px)');
        }
    });
    $('.header-inner').on('mouseleave', function () {
        $('.openlang').removeClass('openlang-select');
    });
});

// util + mobile
$(function () {
    $('.openmenu > a').on('click', function (e) {
        e.preventDefault();
        const $parent = $(this).parent();
        $parent.toggleClass('openmenu-close');
        const $menuBox = $('.gnb-mobile-box');
        if ($parent.hasClass('openmenu-close')) {
            $('.openlang').removeClass('openlang-select');
            $('.search-box').removeClass('search-box-show');
            $('header').removeClass('header-white');
            $menuBox.addClass('gnb-mobile-open');
            $('header').addClass('header-blue');
            $('body').addClass('over-hidden');
            const headerHeight = $('.header-inner').outerHeight();
            $menuBox.css('height', 'calc(100vh - ' + headerHeight + 'px)');
        } else {
            $menuBox.removeClass('gnb-mobile-open');
            $('header').removeClass('header-blue');
            $('body').removeClass('over-hidden');
        }
    });
    $('.gnb-mobile-inner .depth01 > li > a').on('click', function () {
        $('.gnb-mobile-inner .depth01 > li').removeClass('active');
        $(this).parent('li').addClass('active');
    });
});

// visual
$(function () {
    const swiper = new Swiper('.main-vi-swiper', {
        loop: true,
        speed: 1000,
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.main-vi-swiper .pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.main-vi-swiper .next',
            prevEl: '.main-vi-swiper .prev',
        },
    });
});

// scroll-top
$('.scroll-top').on('click', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
});

// copy
$(document).on('click', '.copy-button', function (e) {
    e.preventDefault();
    const dataType = $(this).attr('data-type'); // 'quick-box01', 'quick-box02', 'main-vi-swiper', or 'header-inner'

    // html
    const $clone = $('.' + dataType).clone();
    const htmlContent = $clone[0].outerHTML;

    // css
    $.get('css/style.css', function (cssContent) {
        const lines = cssContent.split('\n');
        let cssLines = [];
        let inSection = false;

        if (dataType === 'quick-box01') {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('/* quickbox */')) {
                    inSection = true;
                }
                if (lines[i].includes('/* quickbox02 */')) {
                    inSection = false;
                }
                if (inSection) {
                    cssLines.push(lines[i]);
                }
            }
        } else if (dataType === 'quick-box02') {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('/* quickbox02 */')) {
                    inSection = true;
                }
                if (lines[i].includes('/* main-copy & copy-button styles */')) {
                    inSection = false;
                }
                if (inSection) {
                    cssLines.push(lines[i]);
                }
            }
        } else if (dataType === 'main-vi-swiper') {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('/* visual */')) {
                    inSection = true;
                }
                if (lines[i].includes('/* quickbox */')) {
                    inSection = false;
                }
                if (inSection) {
                    cssLines.push(lines[i]);
                }
            }
        } else if (dataType === 'header-inner') {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('/* header */')) {
                    inSection = true;
                }
                if (lines[i].includes('/* visual */')) {
                    inSection = false;
                }
                if (inSection) {
                    cssLines.push(lines[i]);
                }
            }
        }

        const cssContentFiltered = cssLines.join('\n').trim();

        // js
        let jsContent = '';
        if (dataType === 'quick-box02') {
            jsContent = `$(function () {
    $('.scroll-top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
});`;
        } else if (dataType === 'main-vi-swiper') {
            jsContent = `$(function () {
    const swiper = new Swiper('.main-vi-swiper', {
        loop: true,
        speed: 1000,
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.main-vi-swiper .pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.main-vi-swiper .next',
            prevEl: '.main-vi-swiper .prev',
        },
    });
});`;
        } else if (dataType === 'header-inner') {
            jsContent = `$(function () {
    $(window).on('scroll', function () {
        $('header').toggleClass('fixed', $(window).scrollTop() > 0);
    }).trigger('scroll');
});

$(function () {
    $('.openpopup > a').on('click', function (e) {
        e.preventDefault();
        $('.openlang').removeClass('openlang-select');
        $('.search-box').removeClass('search-box-show');
        $('.openmenu').removeClass('openmenu-close');
        $('.gnb-mobile-box').removeClass('gnb-mobile-open');
        $('header').removeClass('header-blue');
        $('.popup').addClass('popup-show');
        $('body').addClass('over-hidden');
        const paddingTopVal = $('.header-inner').outerHeight() + 20;
        $('.popup-box').css('padding-top', paddingTopVal + 'px');
    });
    $('.popup-close').on('click', function (e) {
        e.preventDefault();
        $('.popup').removeClass('popup-show');
        $('body').removeClass('over-hidden');
    });
});

$(function () {
    $('.opensearch > a').on('click', function (e) {
        e.preventDefault();
        $('.openlang').removeClass('openlang-select');
        $('.openmenu').removeClass('openmenu-close');
        $('.gnb-mobile-box').removeClass('gnb-mobile-open');
        $('header').removeClass('header-blue');
        $('body').removeClass('over-hidden');
        $('.search-box').toggleClass('search-box-show');
        $('header').toggleClass('header-white');
    });
    $('.search-close').on('click', function (e) {
        e.preventDefault();
        $('.search-box').removeClass('search-box-show');
        $('header').removeClass('header-white');
    });
});

$(function () {
    $('.openlang > a').on('click', function (e) {
        e.preventDefault();
        $('.search-box').removeClass('search-box-show');
        $('.openmenu').removeClass('openmenu-close');
        $('.gnb-mobile-box').removeClass('gnb-mobile-open');
        $('header').removeClass('header-blue');
        $('body').removeClass('over-hidden');
        const $parent = $(this).parent();
        $parent.toggleClass('openlang-select');
        if ($parent.hasClass('openlang-select')) {
            const headerHeight = $('.header-inner').outerHeight();
            const openlangHeight = $parent.outerHeight();
            const offset = (headerHeight - openlangHeight) / 2;
            $parent.find('> ul').css('top', 'calc(100% + ' + offset + 'px)');
        }
    });
    $('.header-inner').on('mouseleave', function () {
        $('.openlang').removeClass('openlang-select');
    });
});

$(function () {
    $('.openmenu > a').on('click', function (e) {
        e.preventDefault();
        const $parent = $(this).parent();
        $parent.toggleClass('openmenu-close');
        const $menuBox = $('.gnb-mobile-box');
        if ($parent.hasClass('openmenu-close')) {
            $('.openlang').removeClass('openlang-select');
            $('.search-box').removeClass('search-box-show');
            $('header').removeClass('header-white');
            $menuBox.addClass('gnb-mobile-open');
            $('header').addClass('header-blue');
            $('body').addClass('over-hidden');
            const headerHeight = $('.header-inner').outerHeight();
            $menuBox.css('height', 'calc(100vh - ' + headerHeight + 'px)');
        } else {
            $menuBox.removeClass('gnb-mobile-open');
            $('header').removeClass('header-blue');
            $('body').removeClass('over-hidden');
        }
    });
    $('.gnb-mobile-inner .depth01 > li > a').on('click', function () {
        $('.gnb-mobile-inner .depth01 > li').removeClass('active');
        $(this).parent('li').addClass('active');
    });
});`;
        }

        // Combine into single clipboard string
        let clipboardContent = '';
        clipboardContent += `/* HTML */\n${htmlContent}\n\n`;
        clipboardContent += `/* CSS */\n${cssContentFiltered}`;
        if (jsContent) {
            clipboardContent += `\n\n/* JS */\n${jsContent}`;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(clipboardContent).then(function () {
            alert('Đã get ' + ' [' + dataType + '].');
        }).catch(function (err) {
            console.error('Lỗi copy: ', err);
        });
    }).fail(function () {
        console.error('Không thể đọc file css/style.css');
    });
});