var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.PinTooltip = (function ($) {

    function PinTooltip() {
        this.handleEvents();

        $(window).resize(function() {
            $('.mod-interactive-map-pin-info').addClass("mod-interactive-map-pin-info-hidden");
        });

        $(window).on("orientationchange", function( event ) {
            $('.mod-interactive-map-pin-info').addClass("mod-interactive-map-pin-info-hidden");
        });
    }

    PinTooltip.prototype.handleEvents = function() {

        //Show panel
        $('.mod-interactive-map-pin').on('click touchstart', function (e) {
            e.preventDefault();

            var timeout = 0;
            if (!$('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent()).hasClass("mod-interactive-map-pin-info-hidden")) {
                this.hideTooltip(e);
                timeout = 301;
            }

            setTimeout(function () {
                this.populateTooltip(e);
                this.placeTooltip(e);
                this.showTooltip(e);
            }.bind(this), timeout);
        }.bind(this));

        //Hide panel
        $('[data-interactive-map-close-tooltip]').on('click touchstart', function (e) {
            e.preventDefault();

            this.hideTooltip(e);
        }.bind(this));
    };

    PinTooltip.prototype.populateTooltip = function(e) {

        //Tooltip element
        toolTip = $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent());

        //Title
        $("h3", toolTip).html($(e.target).attr('data-title'));

        //Content
        $(".description", toolTip).html($(e.target).attr('data-description'));

        //Link
        if($(e.target).attr('data-link')) {
            $(".link", toolTip).attr('href',$(e.target).attr('data-link')).show(0);
        } else {
            $(".link", toolTip).attr('href',$(e.target).attr('data-link')).hide(0);
        }

    };

    PinTooltip.prototype.showTooltip = function(e) {
        $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent()).removeClass("mod-interactive-map-pin-info-hidden");
    };

    PinTooltip.prototype.hideTooltip = function(e) {
        $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent()).addClass("mod-interactive-map-pin-info-hidden");
    };

    PinTooltip.prototype.placeTooltip = function(e) {
        toolTip = $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent());
        $(toolTip).offset($(e.target).offset());
    };

    return new PinTooltip();

})(jQuery);

