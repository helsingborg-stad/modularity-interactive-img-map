<div class="interactive-map-categories-form">
    <div>
        <label for="map-category-name"><?php _e('Category name', 'modularity-interactive-map'); ?></label>
        <input id="map-category-name" type="text" name="map-category-name" class="widefat">
    </div>
    <div>
        <label for="map-category-pin-color"><?php _e('Pin color', 'modularity-interactive-map'); ?> (Hex)</label>
        <input id="map-category-pin-color" type="text" name="map-category-pin-color" class="widefat" maxlength="7">
    </div>
    <div>
        <button type="button" class="button button-primary" data-action="interactive-map-add-pin-category"><?php _e('Add'); ?></button>
    </div>
</div>

<?php
if (count($categories)) {
    echo '<script>jQuery(document).ready(function() {';

    foreach ($categories as $category) {
        echo 'ModularityInteractiveMap.MapPinCategories.addCategory(
                    \'' . $category['name'] . '\',
                    \'' . $category['color'] . '\'
            );';
    }

    echo '});</script>';
}
?>

<ul class="interactive-map-categories-list"></ul>
