<input type="hidden" name="interactive-map-image-id" value="<?php echo $current['id']; ?>">

<div class="map-pin-toolbox">
    <button class="button" type="button" data-action="interactive-map-select-image" data-map-editor-no-map><i class="fa fa-map"></i> <?php _e('Select map image', 'modularity-interactive-map'); ?></button>

    <button class="button" type="button" data-action="interactive-map-add-pin" data-map-editor><i class="fa fa-map-marker"></i> <?php _e('Add pin', 'modularity-interactive-map'); ?></button>
    <button class="button" type="button" data-action="interactive-map-select-image" data-map-editor><i class="fa fa-map"></i> <?php _e('Change map image', 'modularity-interactive-map'); ?></button>
</div>

<div class="map-container">
<?php
if ($current['id']) {
    $imageSrc = wp_get_attachment_url($current['id']);
    echo '<img src="', $imageSrc, '">';

    if ($current['pins']) {
        echo '<script>jQuery(document).ready(function() {';

        foreach ($current['pins'] as $pin) {
            echo 'ModularityInteractiveMap.MapImage.addPin(
                        \'' . $pin['top'] . '\',
                        \'' . $pin['left'] . '\',
                        \'' . $pin['title'] . '\',
                        \'' . $pin['link'] . '\',
                        \'' . preg_replace('/\s+/', ' ',trim($pin['text'])) . '\',
                        \'' . $pin['category'] . '\'
                );';
        }

        echo '});</script>';
    }
} else {
    _e('No map image selected', 'modularity-interactive-map');
}
?>
</div>
