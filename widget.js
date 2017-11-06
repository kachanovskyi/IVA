//© All rights reserved. BotsCrew 2017

(function () {
    //Load Stylesheet
    var root = './';
    // var root = 'https://rawgit.com/kachanovskyi/toyotacr-widget/master/';

    var head = document.getElementsByTagName('head')[0];

    var stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = root + '/widget.css';
    head.appendChild(stylesheet);

    var icons = document.createElement('link');
    icons.type = 'text/css';
    icons.rel = 'stylesheet';
    icons.href = 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css';
    head.appendChild(icons);
    
    setTimeout(function () {
        (window.jQuery && init()) || loadScript("https://code.jquery.com/jquery-1.12.4.min.js", init);           //instead of init func should be isValidTime, so that widget would work only on certain hours
    }, 1000);

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function init() {
        var $ = window.jQuery;

        var chatId = sessionStorage.getItem("toyotaCRchatID");
        // settings = {},
        // script = $('#anychat-script');

        var anchor = $('<div>')
            .attr('id', 'widget-container')
            .appendTo($('body'));

        var chatbot = $('<div>')
            .addClass('chatbot')
            .appendTo(anchor);

        var launcher = $('<div>')
            .addClass('widget-launcher')
            .addClass('widget-effect')
            .append('<i class="zmdi zmdi-email"></i>')
            .append('<div class="arrow-down"></div>')
            // .css('background-image', 'url(data:image/svg+xml,' + escape(btnBg) + ')')
            // .css('background-color', settings.color)
            .appendTo(anchor);

        var ua = navigator.userAgent;
        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        var Android = !!ua.match(/Android/i);
        var Mobile = !!ua.match(/Mobi/i);
        var Mac = !!ua.match(/Macintosh/i);

        var $w = $(window);

        var launcherCont = {};
        var chatTop = 480,
            chatBottom = 50,
            chatWidth = 333;
        launcherCont.bottom = 3;
        launcherCont.right = 16;
        launcherCont.width = 333;
        launcherCont.height = 20;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // if ($w.width() < 500) {
            chatTop = $w.height();
            chatWidth = $w.width();
            launcherCont.width = chatWidth;
            launcherCont.right = 0;
        }

        launcher.click(function () {

            var chatHeight = chatTop;

            var messageContainer = $('<div class="message-container">')
                .attr('id', 'messageContainer')
                // .css('width', launcherCont.width)
                // .css('height', chatHeight)
                .css('background-size', '100%')
                .append( $('<span class="close-btn">') )
                .append(
                    $('<p>')
                        .text(', I am agent ')
                        .prepend('<b>Hello</b>')
                        .append('<b>Reva</b>')
                )
                .append(
                    $('<p>').text('I can help you make your house buying journey easier.')
                )
                .append(
                    $('<img>').attr('src', './reva.png')
                )
                .append(
                    $('<p>').text('Click the button below to chat with me.')
                )
                .append(
                    $('<a class="FB-btn">')
                        .attr('href', 'https://m.me/976494375822154')
                        .attr('target', '_blank')
                        .text('Go to Messenger')
                        .prepend( $('<img>').attr('src', './fb_messenger.png') )
                );


            if ($('#chat-window').length === 0) {
                var chatWindow = $('<div id="chat-window">')
                    // .css('height', chatHeight)
                    .css('bottom', 0)
                    // .css('width', launcherCont.width)
                    .css('position', 'absolute')
                    .css('right', 0)
                    .css('display', 'none')
                    .css('z-index', '10001')
                    .append(messageContainer)
                    .appendTo(chatbot);

                $('.close-btn').on("click", chatWindowClose);
            }

            chatWindowShow();
        });

        function chatWindowShow() {
            $('#chat-window').show().addClass('expanded no-border');
            $("#chatInput").val('');

            if (/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // if ($w.width() < 500) {
                $('body')
                    .animate({
                        scrollTop: 0
                    }, 0)
                    .css('overflow-y', 'hidden')
                    .css('max-height', chatTop)
                    .wrapInner('<div id="overflowWrapper" />');
                $('#overflowWrapper').css('overflow-y', 'hidden').css('height', chatTop);
            } else if (/Android/i.test(navigator.userAgent)) {
                $('body')
                    .scrollTop(0)
                    .css('overflow', 'hidden')
                    .css('height', '100vh');
            }
        }

        function chatWindowClose() {
            $('#chat-window').hide().removeClass('expanded no-border');
            $('.chat-close').hide();

            if (/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // if ($w.width() < 500) {
                $("#overflowWrapper").contents().unwrap();
                $('body')
                    .css('overflow-y', 'auto')
                    .css('max-height', 'none');
            } else if (/Android/i.test(navigator.userAgent)) {
                $('body')
                    .css('overflow-y', 'auto')
                    .css('height', 'auto');
            }
        }

        window.initializeShopchat = init;

        setTimeout(function () {
            if($('#chat-window').length === 0) {
                launcher.trigger("click");
            }
        }, 60000);

        return true;
    }
})();
