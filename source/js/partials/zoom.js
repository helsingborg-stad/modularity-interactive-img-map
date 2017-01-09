var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.Zoom = (function ($) {

    function Zoom() {

        this.init();

        window.addEventListener("orientationchange", function() {
            this.resize();
        }.bind(this), false);

        window.addEventListener("resize", function() {
            this.resize();
        }.bind(this), false);

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

            $("button",obj).click(function(){
                $('.mod-interactive-map-zoomable', $(this).parent().parent()).panzoom("resetPan");
                $('.mod-interactive-map-pin-info').addClass("hidden");
            })

        });
    };

    Zoom.prototype.resize = function() {
        $(".mod-interactive-map-container").each(function( key, obj ) {
            $(".mod-interactive-map-zoomable", obj).panzoom(
                "option",
                "maxScale",
                $("img",obj).get(0).naturalWidth / $("img",obj).get(0).clientWidth
            );
        });
    };

    return new Zoom();

})(jQuery);


