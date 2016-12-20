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

