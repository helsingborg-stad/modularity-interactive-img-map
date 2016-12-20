var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.PinTooltip = (function ($) {

    function PinTooltip() {
        this.handleEvents();
    }

    PinTooltip.prototype.handleEvents = function() {
        $('.mod-interactive-map-pin').on('click', function (e) {
            if ($(e.target).parents('.mod-interactive-map-pin-info').length) {
                return;
            }

            this.toggleTooltip(e.target);
        }.bind(this));

        $('[data-interactive-map-close-tooltip]').on('click', function (e) {
            e.preventDefault();
            var target = $(e.target).parents('.mod-interactive-map-pin')[0];
            this.toggleTooltip(target);
        }.bind(this));
    };

    PinTooltip.prototype.toggleTooltip = function(target) {
        $target = $(target).closest('.mod-interactive-map-pin');

        if ($target.hasClass('mod-interactive-map-pin-active')) {
            $target.removeClass('mod-interactive-map-pin-active');
            return;
        }

        $('.mod-interactive-map-pin-active').removeClass('mod-interactive-map-pin-active');
        $target.addClass('mod-interactive-map-pin-active');
    };

    return new PinTooltip();

})(jQuery);

