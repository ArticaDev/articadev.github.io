$(function() {

    $('[data-toggle="tooltip"]').tooltip();

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 10) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });

    $('.navbar-nav li a').click(function() {

        $('html, body').animate({
            scrollTop: Math.abs($('#home-section').offset().top) + $('#' + $(this).data('section')).offset().top - 100
        }, "100");

    });


    var ww = document.body.clientWidth;
    if (ww < 991.98) {
        $('.navbar').addClass('navbar-dark bg-dark');
    };

    $('#emailIcon').click(function() {
        var input = document.createElement('input');
        input.setAttribute('value', 'articadevteam@gmail.com');
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);


        $('#emailIcon[data-toggle="tooltip"]').attr('data-original-title', "O nosso email foi copiado :)")
            .tooltip('dispose')
            .tooltip('show');

    });



    $('.form-group input, .contact-form textarea').on('keyup', function() {
        let empty = false;

        $('.form-group input, .contact-form textarea').each(function() {
            if ($(this).val().length == 0) {
                empty = true;
            }
        });

        if (empty)
            $('.contact-form button').attr('disabled', 'disabled');
        else {
            $('.contact-form button').attr('disabled', false);
        }
    });

    var walkthrough;
    walkthrough = {
        index: 0,
        nextScreen: function() {
            if (this.index < this.indexMax()) {
                this.index++;
                return this.updateScreen();
            }
        },
        prevScreen: function() {
            if (this.index > 0) {
                this.index--;
                return this.updateScreen();
            }
        },
        updateScreen: function() {
            this.reset();
            this.goTo(this.index);
            return this.setBtns();
        },
        setBtns: function() {
            var $lastBtn, $nextBtn, $prevBtn;
            $nextBtn = $('.next-screen');
            $prevBtn = $('.prev-screen');
            $lastBtn = $('.finish');
            if (walkthrough.index === walkthrough.indexMax()) {
                $nextBtn.prop('disabled', true);
                $prevBtn.prop('disabled', false);
                return $lastBtn.addClass('active').prop('disabled', false);
            } else if (walkthrough.index === 0) {
                $nextBtn.prop('disabled', false);
                $prevBtn.prop('disabled', true);
                return $lastBtn.removeClass('active').prop('disabled', true);
            } else {
                $nextBtn.prop('disabled', false);
                $prevBtn.prop('disabled', false);
                return $lastBtn.removeClass('active').prop('disabled', true);
            }
        },
        goTo: function(index) {
            $('.screen').eq(index).addClass('active');
            return $('.dot').eq(index).addClass('active');
        },
        reset: function() {
            return $('.screen, .dot').removeClass('active');
        },
        indexMax: function() {
            return $('.screen').length - 1;
        },
        closeModal: function() {
            $('.walkthrough, .shade').removeClass('reveal');
            return setTimeout((() => {
                $('.walkthrough, .shade').removeClass('show');
                this.index = 0;
                return this.updateScreen();
            }), 200);
        },
        openModal: function() {
            $('.walkthrough, .shade').addClass('show');
            setTimeout((() => {
                return $('.walkthrough, .shade').addClass('reveal');
            }), 200);
            return this.updateScreen();
        }
    };
    $('.next-screen').click(function() {
        return walkthrough.nextScreen();
    });
    $('.prev-screen').click(function() {
        return walkthrough.prevScreen();
    });
    $('.close').click(function() {
        return walkthrough.closeModal();
    });
    $('.open-walkthrough').click(function() {
        return walkthrough.openModal();
    });
    walkthrough.openModal();

    // Optionally use arrow keys to navigate walkthrough
    return $(document).keydown(function(e) {
        switch (e.which) {
            case 37:
                // left
                walkthrough.prevScreen();
                break;
            case 38:
                // up
                walkthrough.openModal();
                break;
            case 39:
                // right
                walkthrough.nextScreen();
                break;
            case 40:
                // down
                walkthrough.closeModal();
                break;
            default:
                return;
        }
        e.preventDefault();
    });



});