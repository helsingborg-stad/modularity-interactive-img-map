var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.Zoom = (function ($) {

    function Zoom() {
        this.init();
    }

    Zoom.prototype.init = function() {
        $(".mod-interactive-map-container").each(function( key, obj ) {

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

            jQuery("button",obj).click(function(){
                jQuery('.mod-interactive-map-zoomable', jQuery(this).parent().parent()).panzoom("resetPan");
            })

        });
    };
    return new Zoom();

})(jQuery);


