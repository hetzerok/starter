$(document).ready(function(){
    var top = 0;
    var dato;
    dato = {
        "files": [
            {
                "type":"IMAGE",
                "source":"src/img/cbg.jpg",
                "size":620
            }]
    };

    if(device.mobile()) {
        $("body").addClass("mobile");
    } else {
        dato.files.push(
            {"type": "VIDEO",
                "sources": {
                    "h264": {
                        "source": "src/video/v2.mp4",
                        "size": 64844.958
                    }
                }
            });
    }
    if($("main").hasClass("index")) {
        $.html5Loader({
            filesToLoad: dato,
            onBeforeLoad: function () {
                $(".preloader").addClass("active");
            },
            onComplete: function () {
                if (!device.mobile()) {
                    $(".bg .video").html('<video autoplay="" loop="" muted=""><source src="src/video/v2.mp4" type="video/mp4"></video>');
                }
                $(".preloader").removeClass("active");
                console.log("ready");
            },
            onElementLoaded: function (obj, elm) {
            },
            onUpdate: function (percentage) {
            },
            onMediaError: function () {
                console.log("error");
            }
        });
    }

    $(".typed").typed({
        strings: ["Мы создаем сайты, которые работают", "Мы создаем приложения, которые приложения"],
        loop: true,
        typeSpeed: 20,
        backDelay: 5000
    });

    $(".ham").click(function(){
        top = $(window).scrollTop();
        $("html, body").animate({"scrollTop": 0}, 500);
        $(".wrapper").addClass("onleft");
        $(".wrapper").removeClass("onright");
    });
    $(".times").click(function(){
        $(".wrapper").removeClass("onleft");
        setTimeout(scr, 500);
    });

    $(".callbacklink").click(function(){
        top = $(window).scrollTop();
        if(device.mobile()) {
            $("html, body").animate({"scrollTop": 0}, 300, function(){
                $(".wrapper").addClass("onright");
                $(".wrapper").removeClass("onleft");
                $(".callbackform").addClass("active");
            });
        }
        return false;
    });

    var scr = function() {
        $("html, body").animate({"scrollTop": top}, 300);
    };

    $(".ftimes").click(function(){
        $(".wrapper").removeClass("onright");
        $(".callbackform").removeClass("active");
        setTimeout(scr, 500);
    });

    $(".video.begin").waypoint({
        offset: "100%",
        handler: function(direction) {
            var cur = $(this.element).parent().find("video");
            if(direction == "down") {
                $("video").each(function () {
                    this.pause();
                });
                cur[0].play();
            } else if(direction == "up") {
                cur[0].pause();
            }
        }
    });

    $(".video.end").waypoint({
        element: $(".video.end"),
        handler: function(direction) {
            var cur = $(this.element).parent().find("video");
            if(direction == "down") {
                cur[0].pause();
            } else if(direction == "up") {
                $("video").each(function () {
                    this.pause();
                });
                cur[0].play();
            }
        }
    });

    $(".folin").click(function(){
        var that = this;
        var wrapper = $(".foliwrap");
        var i = 1000;
        var images, list, k, text;
        $(wrapper).addClass("active");
        $("body").addClass("oh");
        images = $(that).parents(".portfolioitem").find(".portfolioitem__images").html();
        text = $(that).parents(".portfolioitem").find(".portfolioitem__hidecontent").html();
        $(wrapper).find(".images").html(images);
        $(wrapper).find(".incontent").html(text);
        list = $(wrapper).find(".images a");
        $(list).each(function(index){
            $(this).css("z-index", i);
            $(this).data("ind", index);
            if(i == 1000) {
                $(this).addClass("first");
            }
            $(this).addClass("folimage");
            if(i<1000) {
                k = "1."+index;
                $(this).css("transform", "matrix(" + 1/k + ", 0, 0, " + 1/k + ", " + index*100 + ", 0)");
            }
            i--;
        });
        return false;
    });

    $(".foliwrap").on("click", ".folimage", function() {
        var zindex = $(this).css("z-index");
        var transform = $(this).css("transform");
        var ind = $(this).data("ind");
        var first = $(".foliwrap .folimage.first");

        $(first).removeClass("first");
        $(first).css("z-index", zindex);
        $(first).css("transform", transform);
        $(first).data("ind", ind);

        $(this).addClass("first");
        $(this).css("z-index", "1000");
        $(this).data("ind", "0");
        return false;
    });

    $(".foliwrap .wtimes").click(function(){
        $(".foliwrap").removeClass("active");
        $(".foliwrap .images").html("");
        $(".foliwrap .incontent").html("");
        $("body").removeClass("oh");
    });
});