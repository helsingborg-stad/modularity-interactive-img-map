
var $ = (jQuery);

/*
$(document).ready(function() {
    zoom();
});
*/

document.addEventListener('DOMContentLoaded', function() {
    zoom();
}.bind(this), false);

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



function init() {

    // $(".mod-interactive-map-container").each(function( key, obj ) {
    document.querySelectorAll('.mod-interactive-map-container').forEach(function(obj, key) {    
        var zoomObj = $(obj).find('.mod-interactive-map-zoomable').get(0);
        const panzoom = Panzoom(zoomObj, {
            duration: 150,
            panOnlyWhenZoomed: false,
            minScale: 1,
            maxScale: ($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth),
            increment: 0.1,
            contain: false
        });

        //$(".zoom-in").click(function(){
        document.querySelector('.zoom-in').addEventListener('click', function (event) {    
            panzoom.zoomIn();
        });

        //$(".zoom-out").click(function(){
        document.querySelector('.zoom-out').addEventListener('click', function (event) {  
            panzoom.zoomOut();
        });

    });
}

function resize() {
    //$(".mod-interactive-map-container").each(function( key, obj ) {
    document.querySelectorAll('.mod-interactive-map-container').forEach(function(obj, key) {  

        if($("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth < 1.4) {
            $('.mod-iteractive-map-buttons', obj).addClass('mod-interactive-map-pin-info-hidden');
        } else {
            $('.mod-iteractive-map-buttons', obj).removeClass('mod-interactive-map-pin-info-hidden');
        }



    });
}


