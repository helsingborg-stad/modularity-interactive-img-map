
var $ = (jQuery);

$(document).ready(function() {
    zoom();
});

function zoom() {

    init();
    resize();

    window.addEventListener("orientationchange", function() {
        resize();
    }.bind(this), false);

    window.addEventListener("resize", function() {
        resize();
    }.bind(this), false);

}

function sayZoom() {
    console.log('zooming you');
    //init();
}

function init() {
    console.log('init');
    $(".mod-interactive-map-container").each(function( key, obj ) {
        var zoomObj = $(obj).find('.mod-interactive-map-zoomable').get(0);
        const panzoom = Panzoom(zoomObj, {
            duration: 150,
            panOnlyWhenZoomed: false,
            minScale: 1,
            maxScale: ($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth),
            increment: 0.1,
            contain: false
        });

        $(".zoom-in").click(function(){
            panzoom.zoomIn();
        });

        $(".zoom-out").click(function(){
            panzoom.zoomOut();
        });

    });
}

function resize() {
    $(".mod-interactive-map-container").each(function( key, obj ) {

        if($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth < 1.4) {
            $('.mod-iteractive-map-buttons', obj).addClass('mod-interactive-map-pin-info-hidden');
        } else {
            $('.mod-iteractive-map-buttons', obj).removeClass('mod-interactive-map-pin-info-hidden');
        }



    });
}


