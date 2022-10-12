
var $ = (jQuery);

$(document).ready(function() {
    categories();
});

function categories() {
    $('[data-interactive-map-category]').on('change', function (e) {
        var $checkbox = $(e.target).closest('input');
        var category = $checkbox.attr('data-interactive-map-category');

        if ($checkbox.prop('checked')) {
            toggleCategoryAssets(category, 'show');
        } else {
            toggleCategoryAssets(category, 'hide');
        }
    }.bind(this));
}


function toggleCategoryAssets(category, state) {
    var $checked = $('[data-interactive-map-category]:checked');
    var activeCategories = [];

    $checked.each(function (index, element) {
        activeCategories.push($(this).attr('data-interactive-map-category'));
    });

    $('[data-interactive-map-category-name]').each(function (index, element) {
        var keys = $(this).attr('data-interactive-map-category-name');
        keys = keys.split('|');

        if (!$(keys).filter(activeCategories).length) {
            $(this).removeClass('pin-visible');
        } else {
            $(this).addClass('pin-visible');
        }
    });
}