$(document).ready(function () {
    $('<iframe name="mock_frame" style="display: none; visibility: hidden;"></iframe>').appendTo('body');

    $('#startTopForm, #startBottomForm').on("submit", function () {
        var input = $($('.inputBlock')[0]);

        if($(this).attr('id') === 'startBottomForm') {
            input = $($('.inputBlock')[1]);
            console.log(33);
        }

        input.fadeOut(150, function(){
            var div = $("<div class='success-message'><p>Done! Arnold will contact you shortly</p></div>").hide();
            $(this).replaceWith(div);
            $($('.success-message')[0]).fadeIn("slow");
        });

    });

    $('#startTop').click(startBtnAction);
    $('#startBottom').click(startBtnAction);

    function startBtnAction() {
        var number = $('#phoneTop').val();
        var id = $(this).attr('id');
        var errorMessage = $($('.error-message')[0]);

        if(id === 'startBottom') {
            console.log('window');
            errorMessage = $($('.error-message')[1]);
            number = $('#phoneBottom').val();
        }
        console.log(errorMessage);
        errorMessage.hide();

        if(number !== undefined && number != "" && number != " ") {
            if(isNaN(number)) {
                errorMessage.fadeIn(100);
                return;
            } else if(id === 'startTop') {
                $('#startTopForm').submit();
                console.log('submitting');
            } else if(id === 'startBottom') {
                $('#startBottomForm').submit();
                console.log('submitting bottom');
            }
        } else {
            errorMessage.fadeIn(100);
        }
    }

    $('a.page-scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 900);
                return false;
            }
        }
    });
});
