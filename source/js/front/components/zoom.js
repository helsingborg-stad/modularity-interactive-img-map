
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
    console.log($(".mod-interactive-map-zoomable", obj));
    let zoomObj = $(".mod-interactive-map-zoomable", obj)
    const panzoom = Panzoom(obj, {
    /*$zoomIn: $(".zoom-in",obj),
    $zoomOut:  $(".zoom-out",obj),*/
    duration: 150,
    panOnlyWhenZoomed: false,
    minScale: 1,
    maxScale: ($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth),
    increment: 0.1,
    contain: false
});

/*
$(".mod-interactive-map-zoomable", obj).panzoom({
    $zoomIn: $(".zoom-in",obj),
    $zoomOut:  $(".zoom-out",obj),
    duration: 150,
    panOnlyWhenZoomed: false,
    minScale: 1,
    maxScale: ($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth),
    increment: 0.1,
    contain: false
});
*/
$(".zoom-in").click(function(){
    panzoom.zoomIn();
    console.log('zoom in');
});

$(".zoom-out").click(function(){
    panzoom.zoomOut();
    console.log('zoom out');
});
/*
$("button",obj).click(function(){

    //Reset pan
    $('.mod-interactive-map-zoomable', $(this).parent().parent()).panzoom("resetPan");

    //Remove pin infos
    $('.mod-interactive-map-pin-info').addClass("mod-interactive-map-pin-info-hidden");

    // Zoom class
    $(this).parent().parent().removeClass (function (index, css) {
        return (css.match (/(^|\s)zoomlevel-\S+/g) || []).join(' ');
    }).addClass( 'zoomlevel-' +  Math.ceil( $(".mod-interactive-map-zoomable",$(this).parent().parent()).get(0).getBoundingClientRect().width / $(".mod-interactive-map-zoomable",$(this).parent().parent()).get(0).offsetWidth ));

});
*/
    });
}

function resize() {
    $(".mod-interactive-map-container").each(function( key, obj ) {
/*
        const panzoom = Panzoom(obj, {
            maxScale: $("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth
        });
*/
        if($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth < 1.4) {
            $('.mod-iteractive-map-buttons', obj).addClass('mod-interactive-map-pin-info-hidden');
        } else {
            $('.mod-iteractive-map-buttons', obj).removeClass('mod-interactive-map-pin-info-hidden');
        }

//           panzoom.reset();

        /*           

        //Adjust scale option
        $(".mod-interactive-map-zoomable", obj).panzoom(
            "option",
            "maxScale",
            $("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth
        );

        //Hide / show zoom options
        if($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth < 1.4) {
            $('.mod-iteractive-map-buttons', obj).addClass('mod-interactive-map-pin-info-hidden');
        } else {
            $('.mod-iteractive-map-buttons', obj).removeClass('mod-interactive-map-pin-info-hidden');
        }

        //Reset zoom (zoom all the way out)
        $(".mod-interactive-map-zoomable", obj).panzoom("reset");

        */

    });
}


