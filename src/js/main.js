$(document).ready(function(){
    $(".indslider").owlCarousel({
        items: 1,
        nav: true,
        navRewind: false,
        dots: false,
        loop: false,
        navText: ['<svg width="14px" height="22px"><use xlink:href="#icon-chl"></use></svg>', '<svg width="14px" height="22px"><use xlink:href="#icon-chr"></use></svg>']
    });
    $(".partcarousel").owlCarousel({
        items: 6,
        nav: true,
        loop: false,
        dots: false,
        autoplay: true,
        navRewind: false,
        navText: ['<svg width="21px" height="36px"><use xlink:href="#icon-chl"></use></svg>', '<svg width="21px" height="36px"><use xlink:href="#icon-chr"></use></svg>']
    });
    $(".certcarousel").owlCarousel({
        items: 6,
        nav: true,
        navRewind: false,
        dots: false,
        loop: true,
        autoWidth: true,
        navText: ['<svg width="21px" height="36px"><use xlink:href="#icon-chl"></use></svg>', '<svg width="21px" height="36px"><use xlink:href="#icon-chr"></use></svg>']
    });
    $(".objcarousel, .extcarousel, .intcarousel").owlCarousel({
        items: 4,
        nav: true,
        navRewind: true,
        dots: false,
        loop: false,
        navText: ['<svg width="21px" height="36px"><use xlink:href="#icon-chl"></use></svg>', '<svg width="21px" height="36px"><use xlink:href="#icon-chr"></use></svg>']
    });
    $(".fancy").fancybox({
        type: 'image'
    });
    $(".buybutton, .questbutton").fancybox({
        autoSize: false,
        width: 500,
        type: 'inline'
    });
    $(".searchbut").click(function(){
        var that = this;
        var form = $(that).parent().find(".searchform");
        if ($(form).hasClass("active")) {
            $(that).parent().find(".searchform").removeClass("active");
        } else {
            $(that).parent().find(".searchform").addClass("active");
        }
        return false;
    });
    var first = $(".colorblock a").first();
    var b = $(".colorimage a");
    $(b).attr("href", $(first).data("img"));
    $(b).attr("title", $(first).attr("title"));
    $(b).find("img").attr("src", $(first).attr("href"));
    $(first).addClass("active");
    $(".colorblock a").click(function(){
        var that = this;
        var big = $(".colorimage a");

        $(".colorblock a").each(function(){
            $(this).removeClass("active");
        });
        $(big).attr("href", $(that).data("img"));
        $(big).find("img").attr("src", $(that).attr("href"));
        $(big).attr("title", $(that).attr("title"));
        $(that).addClass("active");
        return false;
    });

    var ms = $("#map");
    if(ms[0])
    {
        var map;

        DG.then(function () {
            var myIcon = DG.icon({
                iconUrl: 'http://tbs.color-demo.ru/assets/templates/tbs/out/img/mark.png',
                iconRetinaUrl: '',
                iconSize: [41, 65],
                iconAnchor: [21, 65],
                popupAnchor: [0, 0],
                shadowUrl: '',
                shadowRetinaUrl: '',
                shadowSize: [0, 0],
                shadowAnchor: [0, 0]
            });

            map = DG.map('map', {
                center: [52.728252, 41.390161],
                zoom: 15,
                scrollWheelZoom: false
            });

            DG.marker([52.728252, 41.390161], {icon: myIcon}).addTo(map).bindPopup('ТамбовБизнесСтрой');
        });
    }
});