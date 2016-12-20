var ModularityInteractiveMap = {};

var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.Categories = (function ($) {

    function Categories() {
        this.handleEvents();
    }

    Categories.prototype.handleEvents = function() {
        $('[data-interactive-map-category]').on('change', function (e) {
            var $checkbox = $(e.target).closest('input');
            var category = $checkbox.attr('data-interactive-map-category');

            if ($checkbox.prop('checked')) {
                this.toggleCategoryPins(category, 'show');
            } else {
                this.toggleCategoryPins(category, 'hide');
            }
        }.bind(this));
    };

    Categories.prototype.toggleCategoryPins = function(category, state) {
        var $pins = $('.mod-interactive-map-pin[data-interactive-map-category-name="' + category + '"]');

        switch (state) {
            case 'hide':
                $pins.hide();
                return;

            case 'show':
                $pins.show();
                return;
        }
    };

    return new Categories();

})(jQuery);


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

