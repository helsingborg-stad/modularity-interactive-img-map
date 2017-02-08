var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.Zoom = (function ($) {

    function Zoom() {

        this.init();
        this.resize();

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

                //Reset pan
                $('.mod-interactive-map-zoomable', $(this).parent().parent()).panzoom("resetPan");

                //Remove pin infos
                $('.mod-interactive-map-pin-info').addClass("mod-interactive-map-pin-info-hidden");

                // Zoom class
                $(this).parent().parent().removeClass (function (index, css) {
                    return (css.match (/(^|\s)zoomlevel-\S+/g) || []).join(' ');
                }).addClass( 'zoomlevel-' +  Math.ceil( $(".mod-interactive-map-zoomable",$(this).parent().parent()).get(0).getBoundingClientRect().width / $(".mod-interactive-map-zoomable",$(this).parent().parent()).get(0).offsetWidth ));

            });
        });
    };

    Zoom.prototype.resize = function(object) {
        //return ;
    }

    Zoom.prototype.resize = function() {
        $(".mod-interactive-map-container").each(function( key, obj ) {

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

        });
    };

    return new Zoom();

})(jQuery);


