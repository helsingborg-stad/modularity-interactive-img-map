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
                this.toggleCategoryAssets(category, 'show');
            } else {
                this.toggleCategoryAssets(category, 'hide');
            }
        }.bind(this));
    };

    Categories.prototype.toggleCategoryAssets = function(category, state) {
        var $assets = $('[data-interactive-map-category-name="' + category + '"]');

        switch (state) {
            case 'hide':
                $assets.hide();
                return;

            case 'show':
                $assets.show();
                return;
        }
    };

    return new Categories();

})(jQuery);

