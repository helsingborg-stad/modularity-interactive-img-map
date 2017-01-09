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
        transform: translate(-50%, -50%);
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

    .mod-interactive-map-pin-info {
        z-index: 3;
        position: absolute;
        width: 0;
        height: 0;
        overflow: visible;
    }

    .mod-interactive-map-pin-info .mod-interactive-map-pin-wrapper {
        position: relative;
        width: 350px;
        background-color: #fff;
        text-align: center;
        padding: 20px;
        border-radius: 5px;
        cursor: default;
        outline: 1px solid #eee;
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

        <!-- Template for pins -->
        <div class="mod-interactive-map-pin-info hidden">
            <div class="mod-interactive-map-pin-wrapper">
                <button type="button" data-interactive-map-close-tooltip>&times;</button>
                <h3>{{title}}</h3>
                <div class="description">{{description}}</div>
                <a href="{{link}}" class="btn btn-primary btn-sm link"><?php _e("Read more",'modularity-interactive-map'); ?></a>
            </div>
        </div>

        <!-- Zoom area with pins -->
        <div class="mod-interactive-map-overflower">
            <div class="mod-interactive-map-zoomable">
                <img src="<?php echo $map; ?>" style="width: 100%;height: auto;">

                <?php foreach ($pins as $pin) : ?>
                <div class="mod-interactive-map-pin" data-title="<?php echo $pin['title']; ?>" data-description="<?php echo preg_replace('/\s+/', ' ',trim($pin['text'])); ?>" data-link="<?php echo $pin['link']; ?>" data-interactive-map-category-name="<?php echo $categories[$pin['category']]['name']; ?>" style="top: <?php echo $pin['top']; ?>;left: <?php echo $pin['left']; ?>;background-color: <?php echo $categories[$pin['category']]['color']; ?>;">
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
