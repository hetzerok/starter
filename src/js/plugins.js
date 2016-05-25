(function($) {
    var spriteList = ['1e', '1o', '2e', '2o', 'all', 'cok', 'u', 'ob', 'kl', 'kr'];
    var classList = {
        'c_2e': ['2e', 'star6', 'c-2e'],
        'c_2o': ['2o', 'gr6', 'c-2o'],
        'c_1e': ['1e', 'star6', 'c-1e'],
        'c_1o': ['1o', 'gr6', 'c-1o'],
        'c_cok': ['cok', 'gr6', 'c-cok'],
        'c_u': ['u', 'gr6', 'c-u'],
        'c_kv': ['all', 'k', 'c-kv'],
        'c_kn': ['all', 'k', 'c-kn'],
        'dn': ['all', 'dno', 'c'],
        'c_top': ['all', 'top', 'c'],
        'c_ob': ['ob', '4', 'c-ob'],
        'c_kl': ['kl', 'gr2', 'c-kl'],
        'c_kr': ['kr', 'gr2', 'c-kr'],
        'c_l': ['all'],
        'c_ico': ['small']
    };
    var defaults = {'u': 'gr6', 'e': 'star6', 'o': 'gr6', 'k': 'k', 'cok': 'gr6', 'ob': '4', 'kl': 'gr2', 'kr': 'gr2'};
    var baseClass = 'c_container';
    var innerClass = 'i_container';
    //var basePath = "http://tbs.color-demo.ru/assets/templates/tbs/out/img/c/";
    var basePath = "src/img/c/";
    var ext = ".png";

    var defValues = function () {
        $.each(classList, function (k, v) {
            var className;
            if (k == "c_top" || k == "c_kl" || k == "c_kr" || k == "c_ob") {
                className = "." + innerClass + " ." + k;
            } else {
                className = "." + baseClass + " ." + k;
            }
            if (k == "c_l") {
                $(className = "." + baseClass + " ." + k).css("background-image", "url(" + basePath + v[0] + ext + ")");
                $("." + innerClass + " ." + k).css("background-image", "url(" + basePath + v[0] + ext + ")");
            } else {
                $(className).css("background-image", "url(" + basePath + v[0] + ext + ")");
            }
            if (v[1] && v[2]) {
                $(className).addClass(v[2] + "-" + v[1]);
                $(className).data("class", v[2] + "-" + v[1]);
            }
        });
        refreshSelect(defaults);
    };

    var refreshSelect = function (options) {
        $.each(options, function (k, v) {
            var className = '.upr_' + k + '__select';
            $(className).val(v);
            $(className).selectric('refresh');
            $(className).trigger('selectric-change');
        });
    }

    var imageLoad = function (key) {
        if (key < spriteList.length) {
            var img = new Image();
            var imgPath = basePath + spriteList[key] + ext;
            img.src = imgPath;
            img.onload = function () {
                key++;
                imageLoad(key);
            };
            img.onerror = function () {
            };
        } else {
            // end preload
            $(".cont .preloader").removeClass("active");
            defValues();
            return true;
        }
    };

    var changeElem = function (cl, value) {
        var curUrl;
        if (cl == "c_top" || cl == "c_kl" || cl == "c_kr" || cl == "c_ob") {
            curUrl = "." + innerClass + " ." + cl;
            console.log(curUrl);
        } else {
            curUrl = "." + baseClass + " ." + cl;
        }
        var curClass = $(curUrl).data("class");
        if ($(curUrl).hasClass("c_hidden")) {
            enableElem(cl);
        }
        $(curUrl).removeClass(curClass);
        $(curUrl).data("class", value);
        $(curUrl).addClass(value);
    };

    var disableElem = function (cl) {
        var curUrl = "." + baseClass + " ." + cl;
        $(curUrl).addClass("c_hidden");
    };

    var enableElem = function (cl) {
        var curUrl = "." + baseClass + " ." + cl;
        $(curUrl).removeClass("c_hidden");
    };

    var zMax = function (e) {
        $(".selectwrap").removeClass('zmax');
        $(e).parents(".selectwrap").addClass('zmax');
    };

    var setIcons = function (itemData, element, index) {
        valu = element.val();
        var resp = "";
        if (valu == "kirp1" || valu == "kirp2" || valu == "none" || valu == "r" || valu == "z" || valu == "k" || !valu.length) {
            resp = itemData.text;
        } else {
            resp = '<span class="c_ico c-icon-' + valu + '"></span>' + itemData.text
        }
        return resp;
    }

    $(document).ready(function () {

        var cont = $(".cont");
        if (cont[0]) {

            // preload
            $(".cont .preloader").addClass("active");
            imageLoad(0);

            // Подключаем селектрик
            $('.upr_u__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_cok__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_e__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_o__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_k__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_kr__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_kl__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });
            $('.upr_ob__select').selectric({
                onOpen: zMax,
                optionsItemBuilder: setIcons
            });

            //Управление переключением видов
            $(".intext a.ext").addClass("active");
            $(".c_container").addClass("active");
            $(".extpreset").addClass("active");
            $(".intext a").click(function () {
                var that = this;
                if ($(that).hasClass("active")) {
                    return false;
                } else {
                    $(that).addClass("active");
                    if ($(that).hasClass("int")) {
                        $(".c_container").removeClass("active");
                        $(".i_container").addClass("active");
                        $(".extpreset").removeClass("active");
                        $(".intpreset").addClass("active");
                        $(".intext a.ext").removeClass("active");
                    } else {
                        $(".i_container").removeClass("active");
                        $(".c_container").addClass("active");
                        $(".intpreset").removeClass("active");
                        $(".extpreset").addClass("active");
                        $(".intext a.int").removeClass("active");
                    }
                }
                return false;
            });

            // Управление переключением этажей
            $(".upr_etage .one").addClass("active");
            $(".upr_etage a").click(function () {
                var that = this;
                if ($(that).hasClass("active")) {
                    return false;
                } else {
                    $(that).addClass("active");
                    if ($(that).hasClass("two")) {
                        $("." + baseClass + " .c_2e").addClass("twoe");
                        $("." + baseClass + " .c_2o").addClass("twoe");
                        $("." + baseClass + " .c_kv").addClass("twoe");
                        $(".upr_etage .one").removeClass("active");
                    } else {
                        $("." + baseClass + " .c_2e").removeClass("twoe");
                        $("." + baseClass + " .c_2o").removeClass("twoe");
                        $("." + baseClass + " .c_kv").removeClass("twoe");
                        $(".upr_etage .two").removeClass("active");
                    }
                }
                return false;
            });

            // Смена углов
            $('.upr_u__select').on('selectric-change', function () {
                changeElem("c_u", "c-u-" + this.value);
            });

            // Смена цоколя
            $('.upr_cok__select').on('selectric-change', function () {
                changeElem("c_cok", "c-cok-" + this.value);
            });

            // Смена стен
            $('.upr_e__select').on('selectric-change', function () {
                changeElem("c_2e", "c-2e-" + this.value);
                changeElem("c_1e", "c-1e-" + this.value);
            });

            // Смена правой стены
            $('.upr_kr__select').on('selectric-change', function () {
                changeElem("c_kr", "c-kr-" + this.value);
            });

            // Смена левой стены
            $('.upr_kl__select').on('selectric-change', function () {
                changeElem("c_kl", "c-kl-" + this.value);
            });

            // Смена обоев
            $('.upr_ob__select').on('selectric-change', function () {
                changeElem("c_ob", "c-ob-" + this.value);
            });

            // Смена окон
            $('.upr_o__select').on('selectric-change', function () {
                if (this.value == "none") {
                    disableElem("c_2o");
                    disableElem("c_1o");
                } else {
                    changeElem("c_2o", "c-2o-" + this.value);
                    changeElem("c_1o", "c-1o-" + this.value);
                }
            });

            // Смена крыши
            $('.upr_k__select').on('selectric-change', function () {
                changeElem("c_kv", "c-kv-" + this.value);
                changeElem("c_kn", "c-kn-" + this.value);
            });

            // Обработка пресетов
            $(".extitem__imagelink, .intitem__imagelink").click(function () {
                var that = this;
                var data = $(that).data('set');
                refreshSelect(data);
                return false;
            });
        }
    });
}(jQuery));