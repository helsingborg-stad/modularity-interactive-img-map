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
        var $checked = $('[data-interactive-map-category]:checked');
        var activeCategories = [];

        $checked.each(function (index, element) {
            activeCategories.push($(this).attr('data-interactive-map-category'));
        });

        $('[data-interactive-map-category-name]').each(function (index, element) {
            var keys = $(this).attr('data-interactive-map-category-name');
            keys = keys.split('|');

            if (!$(keys).filter(activeCategories).length) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    };

    return new Categories();

})(jQuery);

