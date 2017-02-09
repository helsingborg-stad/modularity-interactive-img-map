<?php

$layers = get_post_meta($module->ID, 'interactive_map_layers', true);
if (!$layers) {
    $layers = array(
        'id' => get_post_meta($module->ID, 'interactive_map_image_id', true),
        'name' => 'base',
        'category' => null
    );
}

$pins = get_post_meta($module->ID, 'interactive_map_pins', true);
if (!$pins) {
    $pins = array();
}

$categories = get_post_meta($module->ID, 'interactive_map_categories', true);
if (!$categories) {
    $categories = array();
}

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
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);

        transition: opacity 300ms,
                    transform 300ms;

        position: absolute;
        min-width: 12px;
        min-height: 12px;
        max-width: 20px;
        max-height: 20px;
        width: 1vw;
        height: 1vw;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        box-shadow: 0 0 .3vw rgba(0, 0, 0, 0.7);
    }

    .mod-interactive-map-pin.pin-visible {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    .zoomlevel-2 .mod-interactive-map-pin {
        min-width: 8px;
        min-height: 8px;
        max-width: 12px;
        max-height: 12px;
    }

    .zoomlevel-3 .mod-interactive-map-pin,
    .zoomlevel-4 .mod-interactive-map-pin,
    .zoomlevel-5 .mod-interactive-map-pin,
    .zoomlevel-6 .mod-interactive-map-pin {
        min-width: 6px;
        min-height: 6px;
        max-width: 8px;
        max-height: 8px;
    }

    .mod-interactive-map-pin.mod-interactive-map-pin-active .mod-interactive-map-pin-info {
        display: block;
    }

    .mod-interactive-map-pin-info.mod-interactive-map-pin-info-hidden {
        visibility: hidden;
        opacity: 0;
        transform: translateY(0px);
    }

    .mod-interactive-map-pin-info {
        z-index: 3;
        position: absolute;
        width: 0;
        height: 0;
        visibility: visible;
        overflow: visible;
        opacity: 1;
        transform: translateY(10px);
        transition: opacity 300ms ease-in-out,
                    transform 300ms ease-in-out,
                    visibility 301ms;
    }

    @media (max-width: 600px) {
        .mod-interactive-map-pin-info {
            width: auto !important;
            left: 0 !important;
            top: 0 !important;
        }

        .mod-interactive-map-pin-info .mod-interactive-map-pin-wrapper {
            width: 90% !important;
            margin-left: 5%;
            margin-right: 5%;
            transform: none !important;
        }

        .mod-interactive-map-pin-info::after {
            display: none !important;
        }
    }

    .mod-interactive-map-pin-info .mod-interactive-map-pin-wrapper {
        position: relative;
        width: 350px;
        background-color: #fff;
        text-align: center;
        padding: 20px;
        border-radius: 5px;
        cursor: default;
        border-radius: 2px;
        box-shadow: 0 0 3px rgba(0,0,0,.2);
        transform: translate(calc(-50% + 10px), calc(-100% - 10px));
    }

    .mod-interactive-map-pin-info::after {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% - 10px);
        left: calc(50% + 10px);
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

    .mod-interactive-map-pin-info a.btn {
        margin-top: 10px;
    }

    .mod-iteractive-map-buttons {
        display: block;
        position: absolute;
        right: 0;
        bottom: 5px;
    }

    .mod-iteractive-map-buttons > button {
        display: block;
        padding: 7px;
    }

    .mod-iteractive-map-buttons > button + button {
        margin-top: 5px;
    }

    .mod-interactive-map-overflower {
        position: relative;
    }

    .mod-interactive-map-overflower img:not(:first-of-type) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 100ms, transform 100ms;
    }

    .mod-interactive-map-overflower img.pin-visible {
        opacity: 1;
        transform: translateY(0px);
    }

</style>

<div class="mod-interactive-map-wrapper">
    <?php if (!empty($categories)) : ?>
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
    <?php endif; ?>

    <div class="mod-interactive-map-container">

        <!-- Template for pins -->
        <div class="mod-interactive-map-pin-info mod-interactive-map-pin-info-hidden">
            <div class="mod-interactive-map-pin-wrapper">
                <button type="button" data-interactive-map-close-tooltip>&times;</button>
                <h3>{{title}}</h3>
                <div class="description">{{description}}</div>
                <a href="{{link}}" class="btn btn-primary btn-sm link"><?php _e('Read more', 'modularity-interactive-map'); ?></a>
            </div>
        </div>

        <!-- Zoom area with pins -->
        <div class="mod-interactive-map-overflower">
            <div class="mod-interactive-map-zoomable">
                <?php foreach ($layers as $layer) : ?>
                <img src="<?php echo wp_get_attachment_url($layer['id']); ?>" class="pin-visible" <?php echo isset($layer['category']) && is_array($layer['category']) ? 'data-interactive-map-category-name="' . implode('|', $layer['category']) . '"' : ''; ?>>
                <?php endforeach; ?>

                <?php foreach ($pins as $pin) : ?>
                <div class="mod-interactive-map-pin pin-visible" data-title="<?php echo $pin['title']; ?>" data-description="<?php echo preg_replace('/\s+/', ' ',trim($pin['text'])); ?>" data-link="<?php echo $pin['link']; ?>" data-interactive-map-category-name="<?php echo $categories[$pin['category']]['name']; ?>" style="top: <?php echo $pin['top']; ?>;left: <?php echo $pin['left']; ?>;background-color: <?php echo $categories[$pin['category']]['color']; ?>;">
                </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Zoom action buttons -->
        <div class="mod-iteractive-map-buttons">

            <button class="zoom-in btn button-md btn-secondary">
                <i class="pricon pricon-plus-o"></i>
                <span class="sr-only"><?php _e("Zoom in", 'modularity-interactive-map'); ?></span>
            </button>

            <button class="zoom-out btn button-md btn-secondary">
                <i class="pricon pricon-minus-o"></i>
                <span class="sr-only"><?php _e("Zoom out", 'modularity-interactive-map'); ?></span>
            </button>

        </div>
    </div>
</div>
