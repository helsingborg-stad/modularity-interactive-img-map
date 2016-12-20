<?php
$map = get_post_meta($module->ID, 'interactive_map_image_id', true);
$map = wp_get_attachment_url($map);

$pins = get_post_meta($module->ID, 'interactive_map_pins', true);
$categories = get_post_meta($module->ID, 'interactive_map_categories', true);

foreach ($categories as $key => $category) {
    $categories[$category['name']] = $category;
    unset($categories[$key]);
}
?>
<style scoped>
    .mod-interactive-map-container {
        position: relative;
    }

    .mod-interactive-map-pin {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
    }

    .mod-interactive-map-pin.mod-interactive-map-pin-active .mod-interactive-map-pin-info {
        display: block;
    }

    .mod-interactive-map-pin-info {
        display: none;
        position: absolute;
        z-index: 3;
        bottom: calc(100% + 7px);
        left: 50%;
        transform: translateX(-50%);
        width: 350px;
        background-color: #fff;
        text-align: center;
        padding: 20px;
        border-radius: 5px;
    }

    .mod-interactive-map-pin-info::after {
        content: '';
        display: block;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fff;
    }
</style>

<div class="mod-interactive-map-wrapper">
    <div class="mod-interactive-map-categories">
        <ul>
            <?php foreach ($categories as $category) : ?>
            <li>
                <label>
                    <input type="checkbox" data-interactive-map-category="<?php echo $category['name']; ?>" checked>
                    <?php echo $category['name']; ?>
                </label>
            </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <div class="mod-interactive-map-container">
        <img src="<?php echo $map; ?>" style="width: 100%;height: auto;">

        <?php foreach ($pins as $pin) : ?>
        <div class="mod-interactive-map-pin" data-interactive-map-category-name="<?php echo $categories[$pin['category']]['name']; ?>" style="top: <?php echo $pin['top']; ?>;left: <?php echo $pin['left']; ?>;background-color: <?php echo $categories[$pin['category']]['color']; ?>;">
            <div class="mod-interactive-map-pin-info">
                <?php if (!empty($pin['title'])) : ?>
                <h3><?php echo $pin['title']; ?></h3>
                <?php endif; ?>

                <?php if (!empty($pin['text'])) : ?>
                <div class="description"><?php echo $pin['text']; ?></div>
                <?php endif; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>
