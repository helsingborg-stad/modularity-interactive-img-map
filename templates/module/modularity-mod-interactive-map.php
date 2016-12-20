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
        cursor: default;
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

    [data-interactive-map-close-tooltip] {
        position: absolute;
        right: 10px;
        top: 10px;
        border: 0;
        background-color: transparent;
        font-size: 20px;
        cursor: pointer;
    }

    [data-interactive-map-close-tooltip]:hover {
        color: #ff0000;
    }

    .mod-interactive-map-categories {
        margin-bottom: 60px;
    }

    .mod-interactive-map-categories ul {
        text-align: center;
    }

    .mod-interactive-map-categories li {
        display: inline-block;
        padding: 5px 10px;
        padding-right: 15px;
        border-radius: 30px;
        background-color: rgba(0,0,0,.1);
        text-align: left;
    }

    .mod-interactive-map-category-color-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
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
                    <span style="background-color:<?php echo $category['color']; ?>" class="mod-interactive-map-category-color-indicator"></span>
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
                <button type="button" data-interactive-map-close-tooltip>&times;</button>

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