<?php

namespace ModularityInteractiveMap;

class Module extends \Modularity\Module
{
    public $args = array(
        'id' => 'interactive-map',
        'nameSingular' => 'Interactive Map',
        'namePlural' => 'Interactive Map',
        'description' => 'Create interactive image maps',
        'supports' => array(),
        'icon' => ''
    );

    public function __construct()
    {
        // This will register the module
        $this->register(
            $this->args['id'],
            $this->args['nameSingular'],
            $this->args['namePlural'],
            $this->args['description'],
            $this->args['supports'],
            $this->args['icon']
        );

        // Add our template folder as search path for templates
        add_filter('Modularity/Module/TemplatePath', function ($paths) {
            $paths[] = MODULARITY_INTERACTIVE_MAP_TEMPLATE_PATH;
            return $paths;
        });

        add_action('add_meta_boxes', array($this, 'addMetaboxes'));
        add_action('save_post', array($this, 'save'), 11, 2);

        add_action('wp_enqueue_scripts', array($this, 'enqueueAssets'));
    }

    /**
     * Enqueue your scripts and/or styles with wp_enqueue_script / wp_enqueue_style
     * @return
     */
    public function enqueueAssets()
    {
        /*if (!\ModularityOnePage\App::isOnepage() && !$this->hasModule()) {
            return;
        }*/

        wp_register_script('modularity-interative-map', MODULARITY_INTERACTIVE_MAP_URL . '/dist/js/modularity-interactive-map.min.js', null, '1.1.0', true);
        wp_enqueue_script('modularity-interative-map');
    }

    public function addMetaboxes()
    {
        // Map metabox
        add_meta_box(
            'map-image',
            __('Map image', 'modularity-interactive-map'),
            function () {
                global $post;

                $current = array(
                    'id' => get_post_meta($post->ID, 'interactive_map_image_id', true),
                    'pins' => get_post_meta($post->ID, 'interactive_map_pins', true)
                );

                include MODULARITY_INTERACTIVE_MAP_TEMPLATE_PATH . '/admin/map-image.php';
            },
            'mod-interactive-map',
            'advanced',
            'high'
        );

        add_meta_box(
            'map-pin-categories',
            __('Pin categories', 'modularity-interactive-map'),
            function () {
                global $post;
                $categories = get_post_meta($post->ID, 'interactive_map_categories', true);
                include MODULARITY_INTERACTIVE_MAP_TEMPLATE_PATH . '/admin/map-categories.php';
            },
            'mod-interactive-map',
            'side',
            'default'
        );
    }

    public function save($postId, $post)
    {
        if ($post->post_type !== 'mod-interactive-map') {
            return;
        }

        if (isset($_POST['interactive-map-image-id']) && !empty($_POST['interactive-map-image-id'])) {
            update_post_meta($postId, 'interactive_map_image_id', $_POST['interactive-map-image-id']);
        }

        if (isset($_POST['interactive-map-pin']) && !empty($_POST['interactive-map-pin'])) {
            update_post_meta($postId, 'interactive_map_pins', $_POST['interactive-map-pin']);
        }

        if (isset($_POST['interactive-map-categories']) && !empty($_POST['interactive-map-categories'])) {
            update_post_meta($postId, 'interactive_map_categories', $_POST['interactive-map-categories']);
        }
    }
}
