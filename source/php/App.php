<?php

namespace ModularityInteractiveMap;

class App
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));

        add_action('plugins_loaded', function () {
            if (function_exists('modularity_register_module')) {
                modularity_register_module(
                    MODULARITY_INTERACTIVE_MAP_PATH . 'source/php/', // The directory path of the module
                    'Module' // The class' file and class name (should be the same) withot .php extension
                );
            }
        });
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        global $current_screen;

        if ($current_screen->id !== 'mod-interactive-map') {
            return;
        }

        wp_enqueue_style('modularity-interactive-map', MODULARITY_INTERACTIVE_MAP_URL . '/dist/css/modularity-interactive-map.min.css', null, '1.0.0');
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        global $current_screen;

        if ($current_screen->id !== 'mod-interactive-map') {
            return;
        }

        wp_enqueue_script('modularity-interactive-map', MODULARITY_INTERACTIVE_MAP_URL . '/dist/js/modularity-interactive-map-admin.dev.js', null, '1.0.0', true);
        wp_localize_script('modularity-interactive-map', 'ModInteractiveMapLang', array(
            'close' => __('Close'),
            'remove' => __('Remove'),
            'description' => __('Description'),
            'link' => __('Link', 'modularity-interactive-map'),
            'title' => __('Title')
        ));
    }
}
