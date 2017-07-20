<div class="interactive-map-categories-form">
    <div>
        <label for="map-category-name"><?php _e('Category name', 'modularity-interactive-map'); ?></label>
        <input id="map-category-name" type="text" name="map-category-name" class="widefat">
    </div>
    <div>
        <label for="map-category-pin-icon"><?php _e('Pin icon', 'modularity-interactive-map'); ?></label>
        <div id="map-category-pin-icon">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100"/></svg>
            <img src="" name="map-category-pin-icon">
        </div>
        <button class="button" type="button" data-action="interactive-map-add-icon"><i class="fa fa-map-marker"></i> <?php _e('Add icon', 'modularity-interactive-map'); ?></button>
    </div>
    <div>
        <label for="map-category-pin-color"><?php _e('Pin color', 'modularity-interactive-map'); ?> (Hex)</label>
        <input id="map-category-pin-color" type="color" name="map-category-pin-color" class="widefat" maxlength="7">
    </div>
    <div>
        <button type="button" class="button button-primary" data-action="interactive-map-add-pin-category"><?php _e('Add'); ?></button>
    </div>
</div>

<div class="interactive-map-categories-form-edit">
    <input id="map-category-name" type="hidden" name="map-category-name-before" class="widefat">

    <div>
        <label for="map-category-name"><?php _e('Edit category name', 'modularity-interactive-map'); ?></label>
        <input id="map-category-name" type="text" name="map-category-name" class="widefat">
    </div>
    <div>
        <label for="map-category-pin-icon"><?php _e('Pin icon', 'modularity-interactive-map'); ?></label>
        <div id="map-category-pin-icon">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100"/></svg>
            <img src="" name="map-category-pin-icon">
        </div>
        <button class="button" type="button" data-action="interactive-map-add-icon"><i class="fa fa-map-marker"></i> <?php _e('Add icon', 'modularity-interactive-map'); ?></button>
    </div>
    <div>
        <label for="map-category-pin-color"><?php _e('Edit pin color', 'modularity-interactive-map'); ?> (Hex)</label>
        <input id="map-category-pin-color" type="color" name="map-category-pin-color" class="widefat map-category.colorpicker" maxlength="7">
    </div>
    <div>
        <button type="button" class="button button-primary" data-action="interactive-map-edit-pin-category"><?php _e('Save changes'); ?></button>
        <button type="button" class="button" data-action="interactive-map-stop-edit-pin-category"><?php _e('Cancel'); ?></button>
    </div>
</div>

<?php
if (count($categories)) {
    echo '<script>jQuery(document).ready(function() {';
    foreach ($categories as $category) {
        $svg = (!empty($category['icon'])) ? \Municipio\Helper\Svg::extract($category['icon']) : '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100"/></svg>';
        $svg = preg_replace( "/\r|\n/", "", $svg);
        echo 'ModularityInteractiveMap.MapPinCategories.addCategory(
                    \'' . $category['name'] . '\',
                    \'' . $category['color'] . '\',
                    \'' . $category['icon'] . '\',
                    \'' . $svg . '\'
        );';
    }

    echo '});</script>';
}
?>
<ul class="interactive-map-categories-list"></ul>
